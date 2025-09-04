import React from "react";

const LoadingScreen = ({ difficulty, setDifficulty, loadQuestions, error, loadLocalQuestions, loading }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>

        {loading ? (
          <p className="text-gray-600">Loading questions...</p>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Difficulty</h2>
            <div className="space-y-3">
              {["easy", "medium", "hard"].map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    setDifficulty(level);
                    loadQuestions(level);
                  }}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    difficulty === level
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
                <button
                  onClick={loadLocalQuestions}
                  className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Use offline questions
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default LoadingScreen;
