import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    const { history } = this.props;

    return (
      <section className="ranking-page">
        <h1 data-testid="ranking-title">Ranking</h1>

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
