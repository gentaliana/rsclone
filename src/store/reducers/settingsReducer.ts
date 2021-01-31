import { AnyAction } from 'redux';
import { SettingActions } from '@constants';
import { ISettingsState } from '@types';
import { defaultState } from '../default-state';

export function settings(state: ISettingsState = defaultState.settings, action: AnyAction): ISettingsState {
  const { payload, type } = action;
  switch (type) {
    case SettingActions.SET_LANGUAGE:
      return {
        ...state,
        lang: payload,
      };

    case SettingActions.SET_THEME:
      return {
        ...state,
        currentTheme: payload,
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
    case SettingActions.SET_FIRSTGAMER:
      return {
        ...state,
        gamerNames: [payload, state.gamerNames[1]],
      };
    case SettingActions.SET_SECONDGAMER:
      return {
        ...state,
        gamerNames: [state.gamerNames[0], payload],
      };

    default:
      return state;
  }
}
