import { AnyAction } from 'redux';
import { SettingActions } from '@constants';
import { ISettingsState } from '@types';
import { defaultState } from '../default-state';

export function settings(state: ISettingsState = defaultState.settings, action: AnyAction): ISettingsState {
  const { payload, type } = action;
  switch (type) {
    case SettingActions.SET_SETTINGS:
      return {
        ...state,
        ...payload,
      };

    case SettingActions.SET_LANGUAGE:
      return {
        ...state,
        lang: payload,
      };

    case SettingActions.SET_SOUND:
      return {
        ...state,
        isSoundOn: payload,
      };
    case SettingActions.SET_MUSIC:
      return {
        ...state,
        isMusicOn: payload,
      };

    default:
      return state;
  }
}
