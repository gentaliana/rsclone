import { AnyAction } from 'redux';
import { GameActions, PLAYERS_ID } from '@constants';
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

    case GameActions.SET_NEXT_TURN: {
      if (state.playerTurnId === PLAYERS_ID.FIRST_GAMER_ID) {
        return {
          ...state,
          playerTurnId: PLAYERS_ID.SECOND_GAMER_ID,
        };
      }
      return {
        ...state,
        playerTurnId: PLAYERS_ID.FIRST_GAMER_ID,
      };
    }

    case GameActions.SET_PENALTY_POINTS: {
      if (state.playerTurnId === PLAYERS_ID.FIRST_GAMER_ID) {
        const newPenalties = state.player1.penalties + 1;
        return {
          ...state,
          player1: { ...state.player1, penalties: newPenalties },
        };
      }
      const newPenalties = state.player2.penalties + 1;
      return {
        ...state,
        player2: { ...state.player2, penalties: newPenalties },
      };
    }

    case GameActions.SET_WINNER: {
      return {
        ...state,
        ...payload,
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
