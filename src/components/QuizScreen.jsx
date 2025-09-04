import React from "react";
import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight } from "lucide-react";

const QuizScreen = ({
  questions,
  currentQuestionIndex,
  selectedAnswer,
  handleAnswerSelect,
  handleNextQuestion,
  handlePreviousQuestion,
  score,
  timeLeft,
}) => {
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-6 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-500">
                Question {currentQuestionIndex + 1} / {questions.length}
              </span>
              <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded-full text-sm font-medium shadow-sm">
                {currentQuestion.category}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={20} className={timeLeft <= 10 ? "text-red-500" : "text-gray-500"} />
              <span className={`font-bold text-lg ${timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-gray-700"}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all duration-500 shadow-md"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 border border-gray-200">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 mb-8 leading-relaxed">
            {currentQuestion.question}
          </h2>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => {
              let buttonClass =
                "w-full p-4 text-left rounded-2xl border-2 transition-all duration-200 font-medium shadow-sm hover:scale-105 transform ";
              if (selectedAnswer) {
                if (option === currentQuestion.correctAnswer) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800 shadow-md";
                } else if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800 shadow-md";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                }
              } else {
                buttonClass +=
                  "border-gray-200 bg-white text-gray-700 hover:border-purple-400 hover:bg-purple-50";
              }
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={selectedAnswer || timeLeft === 0}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selectedAnswer && option === currentQuestion.correctAnswer && (
                      <CheckCircle className="text-green-600" size={20} />
                    )}
                    {selectedAnswer && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                      <XCircle className="text-red-600" size={20} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center space-x-2 px-5 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={18} />
            <span>Previous</span>
          </button>
          <div className="text-sm text-gray-600 font-medium">
            Score: {score}/{currentQuestionIndex + (selectedAnswer ? 1 : 0)}
          </div>
          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer && timeLeft > 0}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl hover:from-purple-600 hover:to-indigo-700 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-105"
          >
            <span>{currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
