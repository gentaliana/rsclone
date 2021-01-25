import React from 'react';
import './player.scss';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useSelector } from 'react-redux';
import { IAppState } from '@types';
import { PLAYERS_ID } from '@constants';
import { useTranslation } from 'react-i18next';

type WordsComponentProps = { playerId: number };

export const WordsComponent = ({ playerId }: WordsComponentProps): JSX.Element => {
  const player1 = useSelector((state: IAppState) => state.game.player1);
  const player2 = useSelector((state: IAppState) => state.game.player2);
  const { t } = useTranslation();

  const displayedWords = playerId === PLAYERS_ID.SECOND_GAMER_ID ? player2.playerWords : player1.playerWords;
  return displayedWords.length > 0 ? (
    <ol>
      {displayedWords.map((word) => (
        <OverlayTrigger
          key={word.word}
          placement={playerId === PLAYERS_ID.SECOND_GAMER_ID ? 'left' : 'right'}
          overlay={<Tooltip id={word.word}>{word.description}</Tooltip>}
        >
          <li key={word.word}>{word.word}</li>
        </OverlayTrigger>
      ))}
    </ol>
  ) : (
    <div className="empty-words">{t('game.noWords')}</div>
  );
};
