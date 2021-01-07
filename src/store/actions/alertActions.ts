import { Dispatch } from 'redux';
import { AlertActions } from '@constants';
import { ISetAlertAction, IRemoveAlertAction, INotify } from '@types';

/* eslint-disable implicit-arrow-linebreak */
export const setNotify = (payload: INotify) => (dispatch: Dispatch): ISetAlertAction =>
  dispatch({ type: AlertActions.SET_NOTIFY, payload });

export const removeNotify = () => (dispatch: Dispatch): IRemoveAlertAction =>
  dispatch({ type: AlertActions.REMOVE_NOTIFY });
