import { Dispatch } from 'redux';
import { SettingActions } from '@constants';
import { ISettingsPage, ISetLanguageAction, ISetSettingsAction, ISetSoundAction, ISetMusicAction } from '@types';

/* eslint-disable implicit-arrow-linebreak */
export const setLanguage = (payload: string) => (dispatch: Dispatch): ISetLanguageAction =>
  dispatch({ type: SettingActions.SET_LANGUAGE, payload });

export const setSound = (payload: boolean) => (dispatch: Dispatch): ISetSoundAction =>
  dispatch({ type: SettingActions.SET_SOUND, payload });

export const setMusic = (payload: boolean) => (dispatch: Dispatch): ISetMusicAction =>
  dispatch({ type: SettingActions.SET_MUSIC, payload });

export const setSettings = (payload: ISettingsPage) => (dispatch: Dispatch): ISetSettingsAction =>
  dispatch({ type: SettingActions.SET_SETTINGS, payload });
