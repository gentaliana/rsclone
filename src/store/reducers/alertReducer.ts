import { AnyAction } from 'redux';
import { AlertActions } from '@constants';
import { INotify } from '@types';
import { defaultState } from '../default-state';

export function notify(state: INotify | null = defaultState.notify, action: AnyAction): INotify | null {
  const { payload, type } = action;
  switch (type) {
    case AlertActions.SET_NOTIFY:
      return {
        ...state,
        ...payload,
      };

    case AlertActions.REMOVE_NOTIFY:
      return null;

    default:
      return state;
  }
}
