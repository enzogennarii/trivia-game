export const START_GAME = 'START_GAME';
export const PLAYER_GOT_IT = 'PLAYER_GOT_IT';

export const startGame = (state) => ({
  type: START_GAME,
  payload: state,
});

export const playerGotIt = (score) => ({
  type: PLAYER_GOT_IT,
  payload: score,
});
