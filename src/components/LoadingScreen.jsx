import React from "react";

const LoadingScreen = ({ difficulty, setDifficulty, loadQuestions, error, loadLocalQuestions, loading }) => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full mx-4 border border-gray-200">
      <div className="text-center">
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-t-purple-500 border-gray-200 mx-auto mb-6"></div>
        {loading ? (
          <p className="text-gray-600 text-lg font-semibold animate-pulse">Loading questions...</p>
        ) : (
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-8 tracking-wide">Select Difficulty</h2>
            <div className="space-y-4">
              {["easy", "medium", "hard"].map((level) => (
                <button
                  key={level}
                  onClick={() => { setDifficulty(level); loadQuestions(level); }}
                  className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-transform duration-200 ${
                    difficulty === level
                      ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg transform scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-red-700 text-sm">{error}</p>
                <button
                  onClick={loadLocalQuestions}
                  className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                >
                  Use Offline Questions
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
