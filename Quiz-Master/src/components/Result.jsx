import React from "react";

function Result({ userAnswer, questions, resetQuiz }) {
  const correctAnswers = userAnswer.filter((answer) => answer).length;
  return (
    <div
      className="results"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
      }}
    >
      <h2 style={{ textAlign: "center", fontSize: "2rem" }}>Result</h2>
      <p style={{ fontSize: "1.5rem" }}>
        Congratulation, You have answered{" "}
        <span style={{ color: "greenyellow", fontSize: "1.2em" }}>
          {correctAnswers}
        </span>{" "}
        correct out of{" "}
        <span style={{ color: "green", fontSize: "1.2em" }}>
          {questions.length}
        </span>{" "}
        questions.
      </p>
      <button onClick={resetQuiz} style={{ width: "fit-content" }}>
        Click to Retry
      </button>

      <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {questions.map((question, index) => {
          return (
            <li
              key={index}
              style={{ listStyle: "none", fontSize: "1.5rem" }}
              data-correct={userAnswer[index]}
            >
              Q{index + 1}. {question.question}
              
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Result;
