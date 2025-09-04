import React from "react";
import { Trophy, RotateCcw, CheckCircle, XCircle } from "lucide-react";

const ResultsScreen = ({ score, questions, userAnswers, restartQuiz }) => {
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Score Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-8 text-center border border-gray-200">
          <Trophy className="mx-auto mb-4 text-yellow-400" size={64} />
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Quiz Complete!</h1>
          <div className="text-6xl font-bold text-purple-600 mb-2">{score}/{questions.length}</div>
          <div className="text-xl text-gray-600 mb-6">You scored {percentage}%</div>
          <div className="flex justify-center">
            <button
              onClick={restartQuiz}
              className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl hover:from-purple-600 hover:to-indigo-700 font-semibold shadow-md transform transition hover:scale-105"
            >
              <RotateCcw size={20} />
              <span>Try Again</span>
            </button>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Results</h2>
          <div className="space-y-6">
            {userAnswers.map((answer, index) => (
              <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 flex-1 pr-4">
                    {index + 1}. {answer.question}
                  </h3>
                  {answer.isCorrect ? (
                    <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                  ) : (
                    <XCircle className="text-red-500 flex-shrink-0" size={24} />
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Your Answer:</p>
                    <p
                      className={`p-3 rounded-2xl ${
                        answer.selectedAnswer === null
                          ? "bg-gray-100 text-gray-500"
                          : answer.isCorrect
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {answer.selectedAnswer || "No answer (time up)"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Correct Answer:</p>
                    <p className="p-3 bg-green-100 text-green-800 rounded-2xl">{answer.correctAnswer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
