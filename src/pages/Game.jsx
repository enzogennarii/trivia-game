import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  render() {
    const { history } = this.props;

    return (
      <section>
        <Header />
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
