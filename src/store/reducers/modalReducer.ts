import { AnyAction } from 'redux';
import { ModalActions } from '@constants';
import { IModal, IUniversalModal } from '@types';
import { defaultState } from '../default-state';

export function modal(state: IModal | null = defaultState.modal, action: AnyAction): IModal | null {
  const { payload, type } = action;
  switch (type) {
    case ModalActions.SET_MODAL:
      return {
        ...state,
        ...payload,
      };

    case ModalActions.REMOVE_MODAL:
      return null;

    default:
      return state;
  }
}

export function universalModal(
  state: IUniversalModal | null = defaultState.universalModal,
  action: AnyAction,
): IUniversalModal | null {
  const { payload, type } = action;
  switch (type) {
    case ModalActions.SET_UNIVERSAL_MODAL:
      return {
        ...state,
        ...payload,
      };

    case ModalActions.REMOVE_UNIVERSAL_MODAL:
      return null;

    default:
      return state;
  }
}
