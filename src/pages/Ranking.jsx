import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { restartGame } from '../redux/actions';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      ranking: JSON.parse(localStorage.getItem('ranking')),
    };

    this.handleRestartGame = this.handleRestartGame.bind(this);
  }

  // Função que reseta as informações e pontuações do jogador (evento para botão de jogar de novo)
  handleRestartGame() {
    const { dispatch, history } = this.props;
    dispatch(restartGame());
    history.push('/');
  }

  render() {
    const { ranking } = this.state;

    return (
      <section className="ranking-page">
        <h1 data-testid="ranking-title">Ranking</h1>

        <table>
          {ranking.map((player, index) => (
            <tr key={ index }>
              <td data-testid={ `player-name-${index}` }>
                {player.name}
              </td>
              <td data-testid={ `player-score-${index}` }>
                {player.score}
              </td>
              <td>
                <img src={ player.picture } alt="Avatar do jogador" />
              </td>
            </tr>
          ))}
        </table>

        <button
          data-testid="btn-go-home"
          onClick={ this.handleRestartGame }
        >
          Play Again
        </button>
      </section>
    );
  }
}

Ranking.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = ({ player }) => ({
  gravatarEmail: player.gravatarEmail,
  name: player.name,
  score: player.score,
});

export default connect(mapStateToProps)(Ranking);
