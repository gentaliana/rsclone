import { AnyAction } from 'redux';
import { GameActions } from '@constants';
import { IGameState } from '@types';
import { defaultState } from '../default-state';

/* eslint-disable implicit-arrow-linebreak */
const initField = (fieldSize: number, firstWord: string) => {
  const wordRowIndex = Math.round(fieldSize / 2) - 1;
  const field = [];
  for (let i = 0; i < fieldSize; i++) {
    for (let j = 0; j < fieldSize; j++) {
      const id = i * fieldSize + j;
      let letter = '';
      if (i === wordRowIndex) {
        letter = firstWord.charAt(j);
      }

      field[id] = letter;
    }
  }

  return field;
};

export function game(state: IGameState = defaultState.game, action: AnyAction): IGameState {
  const { payload, type } = action;
  switch (type) {
    case GameActions.SET_FIELD_SIZE:
      return {
        ...state,
        fieldSize: payload,
      };

    case GameActions.SET_GAME: {
      const field = initField(payload.fieldSize, payload.firstWord);
      return {
        ...payload,
        field,
      };
    }

    case GameActions.NEXT_TURN: {
      if (state.isPlayer1Turn) {
        const newPenalties = state.player1.penalties + 1;
        return {
          ...state,
          player1: { ...state.player1, penalties: newPenalties, isLose: newPenalties > 2 },
          isPlayer1Turn: !state.isPlayer1Turn,
        };
      }
      const newPenalties = state.player2.penalties + 1;
      return {
        ...state,
        player2: { ...state.player2, penalties: newPenalties, isLose: newPenalties > 2 },
        isPlayer1Turn: !state.isPlayer1Turn,
      };
    }

    default:
      return state;
  }
}
