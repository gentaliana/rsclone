import { Dispatch } from 'redux';
import { ModalActions } from '@constants';
import { ISetModalAction, IRemoveModalAction, IRedirectModalAction, IModal } from '@types';

export const setModal = (payload: IModal) => (dispatch: Dispatch): ISetModalAction =>
  dispatch({ type: ModalActions.SET_MODAL, payload });

export const removeModal = () => (dispatch: Dispatch): IRemoveModalAction =>
  dispatch({ type: ModalActions.REMOVE_MODAL });

export const redirectModal = () => (dispatch: Dispatch): IRedirectModalAction =>
  dispatch({ type: ModalActions.REDIRECT_MODAL });
