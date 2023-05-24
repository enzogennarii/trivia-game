import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getQuestionsAPI } from '../services/API';
import '../styles/Game.css';
import Timer from '../components/Timer';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: {},
      currentQuestionIndex: 0,
      questions: [],
      shuffledAnswers: [],
      isAnswered: false,
      // timeRemainingWhenAnswered: 30,
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const response = await getQuestionsAPI(token);
    const { history } = this.props;
    if (response.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState((prev) => ({
      questions: response.results,
      currentQuestion: response.results[prev.currentQuestionIndex],
      shuffledAnswers: this.shuffle([
        response.results[prev.currentQuestionIndex].correct_answer,
        ...response.results[prev.currentQuestionIndex].incorrect_answers]),
    }));
  }

  handleAnswerClick = () => {
    this.setState({ isAnswered: true });
  };

  // changeTimeRemaning = (time) => {
  //   this.setState({timeRemainingWhenAnswered: time});
  // };

  shuffle = (array) => {
    const shuffled = array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return shuffled;
  };

  render() {
    const { history } = this.props;

    const { questions, currentQuestion, shuffledAnswers, isAnswered } = this.state;
    return (
      <section className="game-container">
        <Header />
        <Timer
          isAnswered={ isAnswered }
          changeTimeRemaning={ this.changeTimeRemaning }
          handleAnswerClick={ this.handleAnswerClick }
        />
        <h1>Game</h1>
        <button onClick={ () => history.push('/') }>Login</button>
        { questions.length === 0
          ? <span>Carregando...</span>
          : (
            <section>
              <p data-testid="question-category">
                {`Categoria: ${currentQuestion.category}`}
              </p>
              <p>
                {`Dificuldade: ${currentQuestion.difficulty}`}
              </p>
              <p data-testid="question-text">
                {`Pergunta: ${currentQuestion.question}`}
              </p>

              <div data-testid="answer-options">

                {shuffledAnswers.map((element, index) => {
                  if (element === currentQuestion.correct_answer) {
                    return (
                      <button
                        className={ isAnswered ? 'answer correct' : 'answer' }
                        data-testid="correct-answer"
                        disabled={ isAnswered }
                        onClick={ this.handleAnswerClick }
                        key={ index }
                      >
                        {element}
                      </button>
                    );
                  }
                  return (
                    <button
                      className={ isAnswered ? 'answer incorrect' : 'answer' }
                      data-testid={ `wrong-answer-${index}` }
                      disabled={ isAnswered }
                      onClick={ this.handleAnswerClick }
                      key={ index }
                    >
                      {element}
                    </button>
                  );
                })}
              </div>
            </section>
          )}
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Game;
