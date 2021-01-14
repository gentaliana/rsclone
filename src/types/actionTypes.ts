import { SettingActions, GameActions, AlertActions, ModalActions } from '@constants';
import { ISettingsState, IGameState, INotify, IModal } from '@types';

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

export interface ISetGameAgainAction {
  type: typeof GameActions.SET_GAME_AGAIN;
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

export interface ISetModalAction {
  type: typeof ModalActions.SET_MODAL;
  payload: IModal;
}

export interface IRemoveModalAction {
  type: typeof ModalActions.REMOVE_MODAL;
}

export interface IRedirectModalAction {
  type: typeof ModalActions.REDIRECT_MODAL;
}
