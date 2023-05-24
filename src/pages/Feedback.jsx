import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

import { restartGame } from '../redux/actions';

class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      gravatarImg: '',
    };

    this.addPlayerOnRanking = this.addPlayerOnRanking.bind(this);
    this.getPlayerInfo = this.getPlayerInfo.bind(this);
    this.handleRestartGame = this.handleRestartGame.bind(this);
  }

  async componentDidMount() {
    await this.getPlayerInfo();
    this.addPlayerOnRanking();
  }

  // Função que reseta as informações e pontuações do jogador (evento para botão de jogar de novo)
  handleRestartGame() {
    const { dispatch, history } = this.props;
    dispatch(restartGame());
    history.push('/');
  }

  // Função que transforma gravatarEmail (estado global) e converte para gravatarImg (estado local)
  async getPlayerInfo() {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    const gravatarImg = `https://www.gravatar.com/avatar/${hash}`;

    this.setState({
      gravatarImg,
    });
  }

  // Função que adiciona o jogador na lista do ranking do localStorage
  addPlayerOnRanking() {
    const { gravatarImg } = this.state;
    const { name, score } = this.props;

    const playerObj = { name, score, picture: gravatarImg };

    if (localStorage.getItem('ranking')) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      ranking.push(playerObj);
      const sortedRanking = ranking.sort((a, b) => b.score - a.score);
      localStorage.setItem('ranking', JSON.stringify(sortedRanking));
    } else {
      localStorage.setItem('ranking', JSON.stringify([playerObj]));
    }
  }

  render() {
    const { gravatarImg } = this.state;
    const { score, name, assertions, history } = this.props;

    return (
      <section className="feedback-page">
        <p data-testid="feedback-text">
          {assertions <= 2 ? 'Could be better...' : 'Well Done!' }
        </p>

        <img
          src={ gravatarImg }
          alt="avatar player"
          data-testid="header-profile-picture"
        />

        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>

        <button
          data-testid="btn-play-again"
          onClick={ this.handleRestartGame }
        >
          Play Again
        </button>

        <button
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </section>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  gravatarEmail: player.gravatarEmail,
  name: player.name,
  score: player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Feedback);
