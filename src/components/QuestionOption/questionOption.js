import React from "react";

import "./questionOption.css";
export const QuestionOption = (props) => {
  const { option, number, status, onOptionClick } = props;

  console.log(status);
  const getClass = () => {
    if (status === "normal") return "option";
    else if (status === "correct") return "correct-answer";
    else if (status === "wrong") return "wrong-answer";
  };
  return (
    <div className={getClass()} onClick={() => onOptionClick(option)}>
      <div className="option-number">{number}</div>
      <div className="option-answer">{option}</div>
    </div>
  );
};
