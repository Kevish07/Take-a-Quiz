import React, { useState } from 'react';
import quizData from './content/QuestionsData.json';
import './App.css';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(quizData.questions.length).fill(''));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handlePrevious = () => {
    setCurrentQuestion(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentQuestion(prev => Math.min(quizData.questions.length - 1, prev + 1));
  };

  const handleEndQuiz = () => {
    setShowResults(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(quizData.questions.length).fill(''));
    setShowResults(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizData.questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    const totalQuestions = quizData.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <div className="quiz-container results-container">
        <h2>Quiz Results</h2>
        <div className="score">
          You scored {score} out of {totalQuestions} ({percentage}%)
        </div>
        <button className="restart-button" onClick={handleRestartQuiz}>
          Restart Quiz
        </button>

        <div className="solutions-section">
          <h3>Detailed Solutions</h3>
          {quizData.questions.map((question, index) => {
            const isCorrect = selectedAnswers[index] === question.correctAnswer;
            return (
              <div key={question.id} className="solution-item">
                <div className="solution-header">
                  <span className="question-number">Question {index + 1}</span>
                  <span className={`solution-status ${isCorrect ? 'status-correct' : 'status-incorrect'}`}>
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                <div className="question-text">{question.question}</div>
                <div className="your-answer">
                  Your answer: <strong>{selectedAnswers[index] || 'Not answered'}</strong>
                </div>
                <div className="correct-answer">
                  Correct answer: <strong>{question.correctAnswer}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const question = quizData.questions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>Personal Quiz</h1>
        <div className="quiz-progress">
          Question {currentQuestion + 1} of {quizData.questions.length}
        </div>
      </div>

      <div className="question-section">
        <div className="question-text">{question.question}</div>
        <div className="options-container">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${selectedAnswers[currentQuestion] === option ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        <button
          className="nav-button prev-button"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        <button
          className="nav-button end-button"
          onClick={handleEndQuiz}
        >
          End Quiz
        </button>
        <button
          className="nav-button next-button"
          onClick={handleNext}
          disabled={currentQuestion === quizData.questions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;