import { Dispatch } from 'redux';
import { GameActions } from '@constants';
import { IGameState, ISetFieldSizeAction, ISetGameAction, ISetGameAgainAction, INextTurn } from '@types';

/* eslint-disable implicit-arrow-linebreak */
export const setFieldSize = (payload: number) => (dispatch: Dispatch): ISetFieldSizeAction =>
  dispatch({ type: GameActions.SET_FIELD_SIZE, payload });

export const setGame = (payload: IGameState) => (dispatch: Dispatch): ISetGameAction =>
  dispatch({ type: GameActions.SET_GAME, payload });

export const nextTurn = () => (dispatch: Dispatch): INextTurn => dispatch({ type: GameActions.NEXT_TURN });

export const setGameAgain = (payload: IGameState) => (dispatch: Dispatch): ISetGameAgainAction =>
  dispatch({ type: GameActions.SET_GAME_AGAIN, payload });
