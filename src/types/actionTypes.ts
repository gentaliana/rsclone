import { SettingActions, GameActions } from '@constants';
import { ISettingsState, IGameState } from '@types';

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
