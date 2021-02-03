import { Dispatch } from 'redux';
import { ModalActions } from '@constants';
import {
  ISetModalAction,
  IRemoveModalAction,
  IModal,
  IUniversalModal,
  ISetUniversalModalAction,
  IRemoveUniversalModalAction,
} from '@types';

export const setModal = (payload: IModal) => (dispatch: Dispatch): ISetModalAction =>
  dispatch({ type: ModalActions.SET_MODAL, payload });

export const removeModal = () => (dispatch: Dispatch): IRemoveModalAction =>
  dispatch({ type: ModalActions.REMOVE_MODAL });

export const setUniversalModal = (payload: IUniversalModal) => (dispatch: Dispatch): ISetUniversalModalAction =>
  dispatch({ type: ModalActions.SET_UNIVERSAL_MODAL, payload });

export const removeUniversalModal = () => (dispatch: Dispatch): IRemoveUniversalModalAction =>
  dispatch({ type: ModalActions.REMOVE_UNIVERSAL_MODAL });
