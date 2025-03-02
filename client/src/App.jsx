import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuestion = async () => {
    setLoading(true);
    setError(null);
    setUserAnswer(null); // Reset user answer for new question
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=1&category=11&type=multiple'); // Movie category
      const data = response.data.results[0];
      setQuestion(data.question);
      setCorrectAnswer(data.correct_answer);

      const allOptions = [...data.incorrect_answers, data.correct_answer];
      // Shuffle options to prevent correct answer from always being last
      setOptions(allOptions.sort(() => Math.random() - 0.5));
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch question. Please try again.');
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleAnswerClick = (answer) => {
    setUserAnswer(answer);
    if (answer === correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    fetchQuestion();
  };

  return (
    <div className="app">
      <h1>ReelReveal Movie Trivia</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {question && (
        <div className="question-container">
          <p className="question">{question}</p>
          <div className="options">
            {options.map((option, index) => (
              <button
                key={index}
                className={`option ${
                  userAnswer && (option === correctAnswer ? 'correct' : option === userAnswer ? 'incorrect' : '')
                }`}
                onClick={() => handleAnswerClick(option)}
                disabled={userAnswer} // Disable options after an answer is selected
              >
                {option}
              </button>
            ))}
          </div>
          {userAnswer && (
            <div className="feedback">
              {userAnswer === correctAnswer ? (
                <p className="correct-message">Correct!</p>
              ) : (
                <p className="incorrect-message">Incorrect. The correct answer was: {correctAnswer}</p>
              )}
              <button className="next-button" onClick={handleNextQuestion}>Next Question</button>
            </div>
          )}
        </div>
      )}
      <p className="score">Score: {score}</p>
    </div>
  );
}

export default App
