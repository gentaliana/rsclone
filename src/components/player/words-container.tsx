import React from 'react';
import './player.scss';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from '@types';
import { useWindowSize } from '@hooks';
import { PLAYERS_ID, MOBILE_WINDOW_SIZE } from '@constants';
import { useTranslation } from 'react-i18next';
import { setUniversalModal } from '@store';
import { UniversalModal } from '@components';

type WordsComponentProps = { playerId: number };

export const WordsComponent = ({ playerId }: WordsComponentProps): JSX.Element => {
  const player1 = useSelector((state: IAppState) => state.game.player1);
  const player2 = useSelector((state: IAppState) => state.game.player2);
  const { t } = useTranslation();
  const size = useWindowSize();
  const dispatch = useDispatch();
  const modal = useSelector((state: IAppState) => state.universalModal);
  const btnTextTranslated = t('buttons.close');

  const openModal = React.useCallback(
    (title: string, context: string, btnText: string) => {
      dispatch(setUniversalModal({ title, context, btnText }));
    },
    [dispatch],
  );

  const displayedWords = playerId === PLAYERS_ID.SECOND_GAMER_ID ? player2.playerWords : player1.playerWords;
  return displayedWords.length > 0 ? (
    // prettier-ignore
    <ol role="tablist">
      {displayedWords.map((word) =>
        (size > MOBILE_WINDOW_SIZE ? (
          <OverlayTrigger
            key={word.word}
            placement={playerId === PLAYERS_ID.SECOND_GAMER_ID ? 'left' : 'right'}
            overlay={<Tooltip id={word.word}>{word.description}</Tooltip>}
          >
            <li key={word.word}>{word.word}</li>
          </OverlayTrigger>
        ) : (
          <li
            key={word.word}
            role="presentation"
            onClick={() => { document.body.click(); openModal(word.word, word.description, btnTextTranslated); }}
          >
            {word.word}
          </li>
        )))}
      {modal ? <UniversalModal modal={modal} /> : null}
    </ol>
  ) : (
    <div className="empty-words">{t('game.noWords')}</div>
  );
};
