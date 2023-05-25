import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getQuestionsAPI } from '../services/API';
import { playerGotIt } from '../redux/actions';
import Header from '../components/Header';
import Timer from '../components/Timer';
import '../styles/Game.css';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      currentQuestion: {},
      currentQuestionIndex: 0,
      isAnswered: false,
      questions: [],
      shuffledAnswers: [],
    };

    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
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
        const { dispatch } = this.props;
        const timeRemaining = document.querySelector('#time-remaining').innerText;
        const score = this.calcScoreQuestion(currentQuestion.difficulty, timeRemaining);
        dispatch(playerGotIt(score));
      }
    }
  };

  // Função de clique do botão para passar para a próxima pergunta
  nextQuestion() {
    const { currentQuestionIndex, questions } = this.state;
    const limitIndex = 4;

    if (currentQuestionIndex < limitIndex) {
      this.setState({
        currentQuestion: questions[currentQuestionIndex + 1],
        currentQuestionIndex: currentQuestionIndex + 1,
        isAnswered: false,
        shuffledAnswers: this.shuffle([
          questions[currentQuestionIndex + 1].correct_answer,
          ...questions[currentQuestionIndex + 1].incorrect_answers]),
      });
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  }

  // Função que calcula a pontuação da questão acertada
  calcScoreQuestion(difficulty, time) {
    const defaultScore = 10;
    const hard = 3;

    switch (difficulty) {
    case 'hard':
      return (hard * Number(time)) + defaultScore;
    case 'medium':
      return (2 * Number(time)) + defaultScore;
    case 'easy':
      return Number(time) + defaultScore;
    default:
      return 0;
    }
  }

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
      currentQuestion: response.results[prev.currentQuestionIndex],
      questions: response.results,
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
    console.log(currentQuestion.correct_answer);

    return (
      <section className="game-page">
        <Header />
        <section className="game-container">
          { questions.length === 0 ? <span>Carregando...</span> : (
            <div className="game">
              <section className="question-container">
                <p data-testid="question-category" className="question-category">
                  {currentQuestion.category}
                </p>
                <p data-testid="question-difficulty" className="question-difficulty">
                  {currentQuestion.difficulty}
                </p>
                <p data-testid="question-text" className="queststion-text">
                  {currentQuestion.question}
                </p>
              </section>
              <section className="answer-container">
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
                {isAnswered
                  ? (
                    <button
                      data-testid="btn-next"
                      onClick={ this.nextQuestion }
                    >
                      Próximo
                    </button>
                  )
                  : (
                    <Timer
                      isAnswered={ isAnswered }
                      handleAnswerClick={ this.handleAnswerClick }
                    />
                  )}
              </section>
            </div>
          )}
        </section>
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Game);
