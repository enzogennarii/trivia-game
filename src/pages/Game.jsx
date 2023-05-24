import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getQuestionsAPI } from '../services/API';
import Header from '../components/Header';
import Timer from '../components/Timer';
import '../styles/Game.css';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      currentQuestion: {},
      currentQuestionIndex: 0,
      questions: [],
      shuffledAnswers: [],
      isAnswered: false,
      // timeRemaining: 30,
    };

    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.updateStateWithQuestions = this.updateStateWithQuestions.bind(this);
  }

  async componentDidMount() {
    await this.updateStateWithQuestions();
  }

  // Função que exibe as respostas e verifica se o jogador acertou ou não
  handleAnswerClick = (e = undefined) => {
    this.setState({ isAnswered: true });
    if (e) {
      const { currentQuestion } = this.state;
      const correctAnswer = currentQuestion.correct_answer;
      const answerClicked = e.target.innerText;
      if (correctAnswer === answerClicked) {
        console.log('Acertou!');
        const timeRemaining = document.querySelector('#time-remaining').innerText;
        console.log(timeRemaining);
        // dispatch(playerGotIt());
      } else {
        console.log('Errou!');
      }
    } else {
      console.log('Errou!');
    }
  };

  // Função que salva no estado as questões vindas da API
  async updateStateWithQuestions() {
    const token = localStorage.getItem('token');
    const response = await getQuestionsAPI(token);

    if (response.response_code !== 0) {
      const { history } = this.props;
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

  // Função que embaralha as alternativas da questão atualmente exibida
  shuffle(array) {
    return array.map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  render() {
    const { currentQuestion, isAnswered, questions, shuffledAnswers } = this.state;
    const { history } = this.props;

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

        { questions.length === 0 ? <span>Carregando...</span> : (
          <section>
            <p data-testid="question-category">
              {`Categoria: ${currentQuestion.category}`}
            </p>
            <p data-testid="question-difficulty">
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
