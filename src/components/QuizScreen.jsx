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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {currentQuestion.category}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={18} className={timeLeft <= 10 ? "text-red-500" : "text-gray-500"} />
              <span className={`font-bold ${timeLeft <= 10 ? "text-red-500" : "text-gray-700"}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => {
              let buttonClass =
                "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 font-medium ";

              if (selectedAnswer) {
                if (option === currentQuestion.correctAnswer) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800";
                } else if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                }
              } else {
                buttonClass +=
                  "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50";
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
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
