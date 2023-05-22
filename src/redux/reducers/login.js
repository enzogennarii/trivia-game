import { START_GAME } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const login = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case START_GAME:
    return { ...state,
      email: payload.playerEmail,
      name: payload.playerName,
    };
  default:
    return state;
  }
};

export default login;
