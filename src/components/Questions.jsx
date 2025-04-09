import React from "react";

export default function Questions({ questions, onAnswer }) {
  return (
    <div
      className="renderQuestions"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "3rem",
        border: "1px solid white",
        borderRadius: ".5rem",
        padding: "2rem 4rem",
      }}
    >
      <h2 style={{ fontSize: "2rem" }}>{questions.question}</h2>
      <ul className="options" style={{
        width: "100%",
        listStyle: "none",
        padding: "0",
        display: "grid",
        gridTemplateColumns: "auto auto",
        gridGap: "1rem",

      }}>
        {questions.answerOptions.map((option) => {
          return (
            <li key={option.text}>
              <button
                onClick={() => {
                  onAnswer(option.isCorrect);
                }}
              >
                {option.text}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
