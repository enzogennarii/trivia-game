import React, { Component } from 'react';
import PropTypes from 'prop-types';

// O código foi baseado em pesquisas realizadas a partir do link: https://betterprogramming.pub/building-a-simple-countdown-timer-with-react-4ca32763dda7

class Timer extends Component {
  state = {
    seconds: 30,
  };

  componentDidMount() {
    const interval = 1000;
    this.myInterval = setInterval(() => {
      const { seconds } = this.state;
      const { handleAnswerClick } = this.props;
      if (seconds > 0) {
        this.setState((prev) => ({
          seconds: prev.seconds - 1,
        }));
      }
      if (seconds === 0) {
        clearInterval(this.myInterval);
        handleAnswerClick();
      }
    }, interval);
  }

  componentDidUpdate() {
    // const { isAnswered, changeTimeRemaning } = this.props;
    const { isAnswered } = this.props;
    // const { seconds } = this.state;
    if (isAnswered) {
      clearInterval(this.myInterval);
      // changeTimeRemaning(seconds);
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { seconds } = this.state;
    // const { handleAnswerClick, isAnswered } = this.props;
    const finalCount = 10;
    return (
      <div>
        { seconds === 0
          ? <p>Tempo esgotado!</p>
          : (
            <p>
              Time Remaining:
              {seconds < finalCount ? `0${seconds}` : seconds}
            </p>
          )}
      </div>
    );
  }
}

Timer.propTypes = {
  handleAnswerClick: PropTypes.func,
  isAnswered: PropTypes.bool,
}.isRequired;

export default Timer;
