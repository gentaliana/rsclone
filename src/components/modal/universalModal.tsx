import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { removeUniversalModal } from '@store';
import { IUniversalModal } from '@types';
import './modal.scss';

interface IUniversalModalProps {
  modal: IUniversalModal | null;
}

export const UniversalModal = (props: IUniversalModalProps): JSX.Element => {
  const { modal } = props;
  const [modalShow, setModalShow] = useState(true);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(removeUniversalModal());
    setModalShow(false);
  };

  return (
    <Modal
      show={modalShow}
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => setModalShow(false)}
    >
      <Modal.Header>{modal?.title}</Modal.Header>

      <Modal.Body>{modal?.context}</Modal.Body>
      <Modal.Footer>
        <Button variant="warning " size="lg" onClick={() => closeModal()}>
          {modal?.btnText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
