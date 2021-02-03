import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { removeModal } from '@store';
import { Link } from 'react-router-dom';
import { IModal } from '@types';
import './modal.scss';
import { routes } from '@constants';
import cup from '../../assets/images/cup.png';
import ribbon from '../../assets/images/ribbon.png';
import cat from '../../assets/images/grumpy-cat.jpg';

interface IModalProps {
  modal: IModal | null;
}

export const GameOverModal = (props: IModalProps): JSX.Element => {
  const { modal } = props;
  const { t } = useTranslation();
  const [modalShow, setModalShow] = useState(true);
  const dispatch = useDispatch();
  const beginGameAgain = () => {
    dispatch(removeModal());
    setModalShow(false);
  };

  const stayInGame = () => {
    dispatch(removeModal());
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
      <div className="modal-wrapper">
        <img alt="ribbon" className="ribbon" src={ribbon} />
        <Modal.Body>
          <h3 className="modal-title">{t('game.gameEnded')}</h3>
          {modal?.isWin ? <img alt="cup" className="cup" src={cup} /> : <img alt="cat" className="cat" src={cat} />}
          <p>{modal?.contentText}</p>
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-dialog-wrapper">
            <div>
              <p className="modal-question">{t('game.playAgain')}</p>
            </div>
            <div className="modal-buttons">
              <Button variant="warning " size="lg" onClick={() => stayInGame()}>
                {t('game.return')}
              </Button>
              <Link to={routes.SET_GAME}>
                <Button variant="danger" size="lg" onClick={() => beginGameAgain()}>
                  {t('game.yes')}
                </Button>
              </Link>
            </div>
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
};
