import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import { useDispatch } from 'react-redux';
// import { removeModal, setGame } from '@store';
import { Link } from 'react-router-dom';
import { IModal } from '@types';

import './modal.scss';
import { routes } from '@constants';

interface IModalProps {
  modal: IModal | null;
}

export const GameOverModal = (props: IModalProps): JSX.Element => {
  const { modal } = props;
  const [modalShow, setModalShow] = useState(true);

  // const dispatch = useDispatch();
  // const setGameSettings = (settings: IGameState) => dispatch(setGame(settings));

  // const fieldSize = useSelector((state: IAppState) => state.game.fieldSize);
  // const firstWord = React.useMemo(() => FIRST_WORDS.find((word) => word.length === fieldSize), [fieldSize]);

  // const dispatch = useDispatch();
  // const onRemoveModal = () => dispatch(removeModal());

  return (
    <Modal
      show={modalShow}
      backdrop="static"
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => setModalShow(false)}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Game ended!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          {modal?.contentText} {modal?.isWin}
        </p>
        <p>Begin again?</p>
      </Modal.Body>
      <Modal.Footer>
        <Link to={routes.GAME}>
          <Button color="primary">Yes</Button>
        </Link>
        <Button onClick={() => setModalShow(false)}>No</Button>
      </Modal.Footer>
    </Modal>
  );
};
