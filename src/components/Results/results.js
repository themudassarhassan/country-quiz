import React from "react";
import "./result.css";
import scoreImg from "../../img/score.svg";
export const Results = (props) => {
  const { score, onReset } = props;
  return (
    <div className="result-container">
      <img alt="img" src={scoreImg} />
      <div className="body">
        <div className="result-heading">Results</div>
        <div className="score">
          You got <span className="number">{score}</span> correct answers!
        </div>
      </div>
      <a onClick={onReset} className="btn">
        Try again
      </a>
    </div>
  );
};
