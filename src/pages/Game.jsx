import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    const { history } = this.props;

    return (
      <section>
        <h1>Game</h1>
        <button onClick={ () => history.push('/') }>Login</button>
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
