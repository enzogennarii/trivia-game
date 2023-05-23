import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getQuestionsAPI } from '../services/API';
import '../styles/Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: {},
      currentQuestionIndex: 0,
      questions: [],
      shuffledAnswers: [],
      x: false,
      // isAnswer: ,
      // currectBtn: true,
      // incorrectBtn: ,
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
    this.setState({ x: true });
  };

  shuffle = (array) => {
    console.log('array', array);
    const shuffled = array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    console.log('array2', shuffled);
    return shuffled;
  };

  render() {
    const { history } = this.props;

    const { questions, currentQuestion, shuffledAnswers, x } = this.state;
    return (
      <section className="game-container">
        <Header />
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
                        className={ x ? 'answer correct' : 'answer' }
                        data-testid="correct-answer"
                        onClick={ this.handleAnswerClick }
                        key={ index }
                      >
                        {element}
                      </button>
                    );
                  }
                  return (
                    <button
                      className={ x ? 'answer incorrect' : 'answer' }
                      data-testid={ `wrong-answer-${index}` }
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
