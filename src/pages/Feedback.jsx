import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      gravatarImg: '',
    };
  }

  componentDidMount() {
    this.getPlayerInfo();
  }

  getPlayerInfo = async () => {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    const gravatarImg = `https://www.gravatar.com/avatar/${hash}`;

    this.setState({
      gravatarImg,
    });
  };

  render() {
    const { gravatarImg } = this.state;
    const { score, name, assertions } = this.props;

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
      </section>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  score: player.score,
  gravatarEmail: player.gravatarEmail,
  name: player.name,
  assertions: player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Feedback);
