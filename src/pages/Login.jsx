import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getTokenAPI } from '../services/API';
import '../styles/login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      playerName: '',
      playerEmail: '',
      isBtnDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.isBtnDisabled = this.isBtnDisabled.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, this.isBtnDisabled);
  }

  async handleClick() {
    const { history } = this.props;

    const tokenObj = await getTokenAPI();
    console.log(tokenObj);
    localStorage.setItem('token', tokenObj.token);

    history.push('/game');
  }

  isBtnDisabled() {
    const { playerName, playerEmail } = this.state;

    const regex = /\w+@\w+\.\w{2,8}(\.\w{0,2})?/g;
    const validateEmail = regex.test(playerEmail);
    const nameSize = 1;
    const nameTest = playerName.length >= nameSize;

    this.setState({
      isBtnDisabled: !(validateEmail && nameTest),
    });
  }

  render() {
    const { playerName, playerEmail, isBtnDisabled } = this.state;

    return (
      <section className="login-container">
        <form className="login">
          <label htmlFor="input-player-name">
            Nickname
            <input
              type="text"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              value={ playerName }
              name="playerName"
              id="input-player-name"
            />
          </label>

          <label htmlFor="input-gravatar-email">
            Email
            <input
              type="text"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              value={ playerEmail }
              name="playerEmail"
              id="input-gravatar-email"
            />
          </label>

          <button
            type="button"
            disabled={ isBtnDisabled }
            data-testid="btn-play"
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
