import { SettingActions, GameActions, AlertActions } from '@constants';
import { ISettingsState, IGameState, INotify } from '@types';

export interface ISetSettingsAction {
  type: typeof SettingActions.SET_SETTINGS;
  payload: ISettingsState;
}

export interface ISetLanguageAction {
  type: typeof SettingActions.SET_LANGUAGE;
  payload: string;
}

export interface ISetFieldSizeAction {
  type: typeof GameActions.SET_FIELD_SIZE;
  payload: number;
}

export interface ISetGameAction {
  type: typeof GameActions.SET_GAME;
  payload: IGameState;
}

export interface INextTurn {
  type: typeof GameActions.NEXT_TURN;
}

export interface ISetAlertAction {
  type: typeof AlertActions.SET_NOTIFY;
  payload: INotify;
}

export interface IRemoveAlertAction {
  type: typeof AlertActions.REMOVE_NOTIFY;
}
