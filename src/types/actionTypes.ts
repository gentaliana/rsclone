import { SettingActions, GameActions, AlertActions, ModalActions } from '@constants';
import { ISettingsPage, IGameState, INotify, IModal } from '@types';

export interface ISetSettingsAction {
  type: typeof SettingActions.SET_SETTINGS;
  payload: ISettingsPage;
}

export interface ISetLanguageAction {
  type: typeof SettingActions.SET_LANGUAGE;
  payload: string;
}

export interface ISetSoundAction {
  type: typeof SettingActions.SET_SOUND;
  payload: boolean;
}

export interface ISetMusicAction {
  type: typeof SettingActions.SET_MUSIC;
  payload: boolean;
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

export interface IStartGame {
  type: typeof GameActions.SET_START_GAME;
}
export interface IStopGame {
  type: typeof GameActions.SET_STOP_GAME;
}
export interface ISetModalAction {
  type: typeof ModalActions.SET_MODAL;
  payload: IModal;
}

export interface IRemoveModalAction {
  type: typeof ModalActions.REMOVE_MODAL;
}
