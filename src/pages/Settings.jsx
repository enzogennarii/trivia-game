import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Settings extends Component {
  render() {
    const { history } = this.props;

    return (
      <section>
        <h1 data-testid="settings-title">Configurações</h1>
        <button onClick={ () => history.push('/') }>Login</button>
      </section>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Settings;
