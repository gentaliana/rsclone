import { AnyAction } from 'redux';
import { GameActions } from '@constants';
import { IGameState } from '@types';
import { defaultState } from '../default-state';

export function game(state: IGameState = defaultState.game, action: AnyAction): IGameState {
  const { payload, type } = action;
  switch (type) {
    case GameActions.SET_FIELD_SIZE:
      return {
        ...state,
        fieldSize: payload,
      };

    case GameActions.SET_GAME: {
      return {
        ...payload,
      };
    }

    case GameActions.NEXT_TURN: {
      if (state.isPlayer1Turn) {
        const newPenalties = state.player1.penalties + 1;
        return {
          ...state,
          player1: { ...state.player1, penalties: newPenalties },
          isPlayer1Turn: !state.isPlayer1Turn,
        };
      }
      const newPenalties = state.player2.penalties + 1;
      return {
        ...state,
        player2: { ...state.player2, penalties: newPenalties },
        isPlayer1Turn: !state.isPlayer1Turn,
      };
    }

    case GameActions.SET_START_GAME: {
      return {
        ...state,
        isGameStart: true,
      };
    }

    case GameActions.SET_STOP_GAME: {
      return {
        ...state,
        isGameStart: false,
      };
    }

    default:
      return state;
  }
}
