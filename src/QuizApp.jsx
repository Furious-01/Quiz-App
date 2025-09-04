import React, { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import QuizScreen from "./components/QuizScreen";
import ResultsScreen from "./components/ResultsScreen";
import { decodeHtml, shuffleArray } from "./utils/helpers";
import { localQuestions } from "./utils/localQuestions";

const QuizApp = () => {
  // State
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState("loading"); // loading | quiz | results
  const [timeLeft, setTimeLeft] = useState(30);
  const [difficulty, setDifficulty] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* -------------------------------
     Load Questions
  --------------------------------- */
  const loadQuestions = async (selectedDifficulty = "medium") => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&difficulty=${selectedDifficulty}&type=multiple`
      );

      if (!response.ok) throw new Error("Failed to fetch questions");
      const data = await response.json();
      if (data.response_code !== 0) throw new Error("No questions available");

      const formattedQuestions = data.results.map((q, index) => {
        const allAnswers = shuffleArray([...q.incorrect_answers, q.correct_answer]);
        return {
          id: index,
          question: decodeHtml(q.question),
          options: allAnswers.map((answer) => decodeHtml(answer)),
          correctAnswer: decodeHtml(q.correct_answer),
          category: decodeHtml(q.category),
          difficulty: q.difficulty,
        };
      });

      setQuestions(formattedQuestions);
      setQuizState("quiz");
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setScore(0);
      setTimeLeft(30);
    } catch (err) {
      setError(err.message);
      loadLocalQuestions();
    } finally {
      setLoading(false);
    }
  };

  const loadLocalQuestions = () => {
    setQuestions(localQuestions);
    setQuizState("quiz");
    setError(null);
  };

  /* -------------------------------
     Timer
  --------------------------------- */
  useEffect(() => {
    let timer;
    if (quizState === "quiz" && timeLeft > 0 && !selectedAnswer) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !selectedAnswer && quizState === "quiz") {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, selectedAnswer, quizState]);

  const handleTimeUp = () => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const newAnswer = {
      questionId: questions[currentQuestionIndex].id,
      selectedAnswer: null,
      correctAnswer,
      isCorrect: false,
      question: questions[currentQuestionIndex].question,
      options: questions[currentQuestionIndex].options,
    };

    setUserAnswers((prev) => [...prev, newAnswer]);

    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  /* -------------------------------
     Question Actions
  --------------------------------- */
  const handleAnswerSelect = (answer) => {
    if (selectedAnswer || timeLeft === 0) return;

    setSelectedAnswer(answer);
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const isCorrect = answer === correctAnswer;

    const newAnswer = {
      questionId: questions[currentQuestionIndex].id,
      selectedAnswer: answer,
      correctAnswer,
      isCorrect,
      question: questions[currentQuestionIndex].question,
      options: questions[currentQuestionIndex].options,
    };

    setUserAnswers((prev) => [...prev, newAnswer]);
    if (isCorrect) setScore((prev) => prev + 1);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setQuizState("results");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      const prevAnswer = userAnswers.find(
        (a) => a.questionId === questions[currentQuestionIndex - 1].id
      );
      setSelectedAnswer(prevAnswer?.selectedAnswer || null);
      setTimeLeft(30);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setScore(0);
    setTimeLeft(30);
    setQuizState("loading");
    setError(null);
    loadQuestions(difficulty);
  };

  /* -------------------------------
     Init Load
  --------------------------------- */
  useEffect(() => {
    loadQuestions(difficulty);
  }, []);

  /* -------------------------------
     Render
  --------------------------------- */
  if (quizState === "loading") {
    return (
      <LoadingScreen
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        loadQuestions={loadQuestions}
        error={error}
        loadLocalQuestions={loadLocalQuestions}
        loading={loading}
      />
    );
  }

  if (quizState === "quiz") {
    return (
      <QuizScreen
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        selectedAnswer={selectedAnswer}
        handleAnswerSelect={handleAnswerSelect}
        handleNextQuestion={handleNextQuestion}
        handlePreviousQuestion={handlePreviousQuestion}
        score={score}
        timeLeft={timeLeft}
      />
    );
  }

  if (quizState === "results") {
    return (
      <ResultsScreen
        score={score}
        questions={questions}
        userAnswers={userAnswers}
        restartQuiz={restartQuiz}
      />
    );
  }

  return null;
};

export default QuizApp;
