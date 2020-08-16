import React, { Component } from "react";

import "./App.css";
import { Question, NextBtn } from "./components";
import { getCountriesList } from "./services/countryService";
import { Results } from "./components/Results/results";
import quizImg from "./img/quiz-img.svg";

class App extends Component {
  state = {
    countriesData: [],
    question: {
      statement: "",
      options: [],
      correctAnswer: "",
      flag: "",
    },
    userAnswer: "",
    questionIndex: 0,
    score: 0,
    showResult: false,
  };

  async componentDidMount() {
    const response = await getCountriesList();
    this.setState({ countriesData: response.data }, () =>
      this.generateQuestion()
    );
  }

  handleOptionClick = (option) => {
    if (this.state.userAnswer === "") {
      if (option === this.state.question.correctAnswer)
        this.setState({ score: this.state.score + 1 });
      this.setState({ userAnswer: option });
    }
  };

  generateQuestionOptions = (options) => {
    const { countriesData } = this.state;
    const totalCounties = countriesData.length;
    while (options.length !== 4) {
      const index = Math.round(Math.random() * totalCounties);
      if (options.indexOf(countriesData[index].name) === -1)
        options.push(countriesData[index].name);
    }
    options.sort(function (a, b) {
      return 0.5 - Math.random();
    });
    return options;
  };

  generateFlagQuestion = () => {
    const { countriesData, questionIndex } = this.state;
    const question = {};
    const country = countriesData[questionIndex];

    question.statement = "Which country does this flag belong to?";
    question.flag = country.flag;
    question.correctAnswer = country.name;
    const options = [country.name];
    this.generateQuestionOptions(options);

    question.options = options;

    this.setState({ question });
  };

  generateCapitalQuestion = () => {
    const { countriesData, questionIndex } = this.state;
    const question = {};
    const country = countriesData[questionIndex];

    question.statement = `${country.capital} is the capital of?`;
    question.correctAnswer = country.name;
    const options = [country.name];
    this.generateQuestionOptions(options);

    question.options = options;
    console.log("queston::", question);
    this.setState({ question });
  };
  generateQuestion = () => {
    const num = Math.round(Math.random());
    if (num === 0) this.generateCapitalQuestion();
    else this.generateFlagQuestion();
  };

  handleNext = () => {
    if (this.state.userAnswer === this.state.question.correctAnswer) {
      this.setState(
        { questionIndex: this.state.questionIndex + 1, userAnswer: "" },
        () => this.generateQuestion()
      );
    } else {
      this.setState({ showResult: true });
    }
  };

  resetGame = () => {
    const data = [...this.state.countriesData];
    data.sort(function (a, b) {
      return 0.5 - Math.random();
    });
    this.setState(
      {
        countriesData: data,
        showResult: false,
        questionIndex: 0,
        userAnswer: "",
        score: 0,
      },
      () => this.generateQuestion()
    );
  };
  render() {
    return (
      <div className="quiz-bg">
        <div className="quiz-container">
          <div className="quiz-heading">Country Quiz</div>

          <div className="quiz-body">
            {this.state.showResult ? (
              <Results score={this.state.score} onReset={this.resetGame} />
            ) : (
              <div>
                <img className="quiz-img" src={quizImg} />
                <Question
                  {...this.state.question}
                  userAnswer={this.state.userAnswer}
                  onOptionClick={this.handleOptionClick}
                />
                <NextBtn onClick={this.handleNext} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
