import { AnyAction, combineReducers } from 'redux';
import { AppActions } from '@store';
import { DEFAULT_LANG } from '@constants';
import { IAppState } from '@types';
import { defaultState } from '@store';

export function langReducer(state: IAppState = defaultState, action: AnyAction) {
  const { payload, type } = action;
  switch (type) {
    case AppActions.SET_LANGUAGE:
      const lang = payload || DEFAULT_LANG;

      return {
        ...state,
        lang,
      };

    default:
      return state;
  }
}

export const rootReducer = combineReducers<any>({ lang: langReducer });
