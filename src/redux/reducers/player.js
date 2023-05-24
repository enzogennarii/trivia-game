import { PLAYER_GOT_IT, START_GAME } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case START_GAME:
    return { ...state,
      gravatarEmail: payload.playerEmail,
      name: payload.playerName,
    };
  case PLAYER_GOT_IT:
    return {
      ...state,
      score: state.score + payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
