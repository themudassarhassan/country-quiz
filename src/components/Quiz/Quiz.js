import React, { useState, useEffect } from "react";
import "./Quiz.css";
import { NextBtn, Question } from "../";
export const Quiz = (props) => {
  const { data: countriesData } = props;

  const [question, setQuestion] = useState({ statement: "", options: [] });
  const [questionIndex, setquestionIndex] = useState(0);

  useEffect(() => {
    generateQuestion();
  }, [questionIndex]);
  const generateQuestionOptions = (options) => {
    const totalCounties = countriesData.length;
    while (options.length !== 4) {
      const index = Math.round(Math.random() * totalCounties);
      if (options.indexOf(countriesData[index].capital) === -1)
        options.push(countriesData[index].capital);
    }
    return options;
  };
  const generateQuestion = () => {
    const question = {};
    if (countriesData.length !== 0) {
      const country = countriesData[questionIndex];

      question.statement = `${country.capital} is the capital of?`;
      question.correctAnswer = country.capital;
      const options = [country.capital];
      generateQuestionOptions(options);

      question.options = options;
      console.log(question);
      setQuestion(question);
    }
  };
  return (
    <div>
      <div className="quiz-heading">Country Quiz</div>
      <div className="quiz-body">
        <Question {...question}></Question>
        <NextBtn></NextBtn>
      </div>
    </div>
  );
};
