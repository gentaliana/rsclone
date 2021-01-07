import { Dispatch } from 'redux';
import { SettingActions } from '@constants';
import { ISettingsState, ISetLanguageAction, ISetSettingsAction } from '@types';

/* eslint-disable implicit-arrow-linebreak */
export const setLanguage = (payload: string) => (dispatch: Dispatch): ISetLanguageAction =>
  dispatch({ type: SettingActions.SET_LANGUAGE, payload });

export const setSettings = (payload: ISettingsState) => (dispatch: Dispatch): ISetSettingsAction =>
  dispatch({ type: SettingActions.SET_SETTINGS, payload });
