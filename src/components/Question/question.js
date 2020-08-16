import React, { useState } from "react";

import { QuestionOption, NextBtn } from "../";

import "./question.css";

export const Question = (props) => {
  const {
    statement,
    options,
    correctAnswer,
    userAnswer,
    flag,
    onOptionClick,
  } = props;
  console.log(userAnswer);

  const getStatus = (option) => {
    console.log("option::", option);
    if (userAnswer) {
      if (userAnswer === option) {
        if (userAnswer === correctAnswer) return "correct";
        return "wrong";
      } else if (option === correctAnswer) {
        if (userAnswer !== correctAnswer) return "correct";
      } else return "normal";
    } else return "normal";
  };
  return (
    <div className="quiz-question">
      {flag && <img src={flag} height="50" width="100" />}
      <div className="quiz-question-statement">{statement}</div>
      {options.map((option, index) => (
        <QuestionOption
          key={index}
          option={option}
          number={index + 1}
          onOptionClick={onOptionClick}
          status={getStatus(option)}
        ></QuestionOption>
      ))}
    </div>
  );
};
