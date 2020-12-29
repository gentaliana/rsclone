import { Dispatch } from 'redux';
import { SettingActions } from '@constants';
import { ISettingsState } from '@types';

export const setLanguage = (payload: string) => (dispatch: Dispatch) => {
  dispatch({ type: SettingActions.SET_LANGUAGE, payload });
};

export const setSettings = (payload: ISettingsState) => (dispatch: Dispatch) => {
  dispatch({ type: SettingActions.SET_SETTINGS, payload });
};
