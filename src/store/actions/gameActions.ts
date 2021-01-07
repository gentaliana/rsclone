import { Dispatch } from 'redux';
import { GameActions } from '@constants';
import { IGameState, ISetFieldSizeAction, ISetGameAction } from '@types';

/* eslint-disable implicit-arrow-linebreak */
export const setFieldSize = (payload: number) => (dispatch: Dispatch): ISetFieldSizeAction =>
  dispatch({ type: GameActions.SET_FIELD_SIZE, payload });

export const setGame = (payload: IGameState) => (dispatch: Dispatch): ISetGameAction =>
  dispatch({ type: GameActions.SET_GAME, payload });
