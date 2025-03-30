import { useState } from "react";
import "./App.css";
import Questions from "./components/Questions";
import QuestionsData from "./content/QuestionsData.json";
import Result from "./components/Result";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);

  const handleNextQuestion = (isCorrect) => {
    setCurrentQuestion(currentQuestion + 1);
    setUserAnswer([...userAnswer, isCorrect]);
  };
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswer([]);
  };
  return (
    <>
      <div className="container">
        <h2>Take A Quiz</h2>
        <div className="border"></div>
        {currentQuestion < QuestionsData.length && (
          <Questions
            questions={QuestionsData[currentQuestion]}
            onAnswer={handleNextQuestion}
          />
        )}

        {currentQuestion === QuestionsData.length && (
          <Result
            userAnswer={userAnswer}
            questions={QuestionsData}
            resetQuiz={resetQuiz}
          />
        )}
      </div>
    </>
  );
}

export default App;
