import React, { Component } from 'react';
import PropTypes from 'prop-types';

// O código foi baseado em pesquisas realizadas a partir do link: https://betterprogramming.pub/building-a-simple-countdown-timer-with-react-4ca32763dda7
class Timer extends Component {
  constructor() {
    super();

    this.state = {
      seconds: 30,
    };

    this.createTimer = this.createTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
  }

  componentDidMount() {
    this.createTimer();
  }

  componentDidUpdate() {
    const { isAnswered } = this.props;
    if (isAnswered) {
      clearInterval(this.myInterval);
    }
  }

  // Função que cria um cronômetro
  createTimer() {
    const interval = 1000;
    this.myInterval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState((prev) => ({
          seconds: prev.seconds - 1,
        }));
      }
      if (seconds === 0) {
        this.pauseTimer();
      }
    }, interval);
  }

  // Função que pausa o cronômetro
  pauseTimer() {
    const { handleAnswerClick } = this.props;
    clearInterval(this.myInterval);
    handleAnswerClick();
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
              <span id="time-remaining">
                {seconds < finalCount ? `0${seconds}` : seconds}
              </span>
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
