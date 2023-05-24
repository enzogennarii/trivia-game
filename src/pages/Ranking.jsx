import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const ordenedPlayers = ranking; // ranking.sort((a, b) => b.score - a.score);
    console.log(ranking);
    console.log(ordenedPlayers);

    return (
      <section className="ranking-page">
        <h1 data-testid="ranking-title">Ranking</h1>

        <table>
          {
            ordenedPlayers.map((player, index) => (
              <tr key={ index }>
                <td data-testid={ `player-name-${index}` }>
                  {player.name}
                </td>
                <td data-testid={ `player-score-${index}` }>
                  {player.score}
                </td>
                <td>
                  <img src={ player.gravatarImg } alt="imagem" />
                </td>
              </tr>
            ))
          }

        </table>

        {/* {
          ordenedPlayers.map((player, index) => (

            <>
              <p data-testid={ `player-name-${index}` }>

                {player.name}
              </p>
              <p data-testid={ `player-score-${index}` }>
                {player.score}
              </p>
              <p>
                <img src={ player.gravatarImg } alt="imagem" />
              </p>
            </>

          ))
        } */}

        <button
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </section>
    );
  }
}

Ranking.propTypes = {
  score: PropTypes.number,
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = ({ player }) => ({
  score: player.score,
  gravatarEmail: player.gravatarEmail,
  name: player.name,
});

export default connect(mapStateToProps)(Ranking);
