import { Dispatch } from 'redux';
import { GameActions } from '@constants';
import {
  IGameState,
  ISetFieldSizeAction,
  ISetGameAction,
  INextTurn,
  IStartGame,
  IStopGame,
  ISetWinner,
  IWinnerState,
  IPenaltiesPoints,
} from '@types';

/* eslint-disable implicit-arrow-linebreak */
export const setFieldSize = (payload: number) => (dispatch: Dispatch): ISetFieldSizeAction =>
  dispatch({ type: GameActions.SET_FIELD_SIZE, payload });

export const setGame = (payload: IGameState) => (dispatch: Dispatch): ISetGameAction =>
  dispatch({ type: GameActions.SET_GAME, payload });

export const nextTurn = () => (dispatch: Dispatch): INextTurn => dispatch({ type: GameActions.SET_NEXT_TURN });

export const setPenaltyPoints = () => (dispatch: Dispatch): IPenaltiesPoints =>
  dispatch({ type: GameActions.SET_PENALTY_POINTS });

export const setWinner = (payload: IWinnerState) => (dispatch: Dispatch): ISetWinner =>
  dispatch({ type: GameActions.SET_WINNER, payload });

export const startGame = () => (dispatch: Dispatch): IStartGame => dispatch({ type: GameActions.SET_START_GAME });

export const stopGame = () => (dispatch: Dispatch): IStopGame => dispatch({ type: GameActions.SET_STOP_GAME });
