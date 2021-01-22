import React from 'react';
import './player.scss';
import { IAppState } from '@types';
import { useSelector } from 'react-redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { PLAYERS_ID, Theme } from '@constants';

type PlayerWordsProps = {
  playerId: number;
};

export const PlayerWords = ({ playerId }: PlayerWordsProps): JSX.Element => {
  const player1 = useSelector((state: IAppState) => state.game.player1);
  const player2 = useSelector((state: IAppState) => state.game.player2);

  const displayedWords = playerId === PLAYERS_ID.SECOND_GAMER_ID ? player2.playerWords : player1.playerWords;
  const playerTurnId = useSelector((state: IAppState) => state.game.playerTurnId);
  const isCurrent = playerTurnId === playerId;
  const themeInitial = useSelector((state: IAppState) => state.settings.currentTheme);
  const themeChange = themeInitial === Theme.light ? 'player-words--current-light' : 'player-words--current-dark';
  const themeChangePlayer = themeInitial === Theme.light ? 'player-words-light' : 'player-words-dark';

  const classList = ['player-words'];

  if (isCurrent) {
    classList.push(themeChange);
  }

  return (
    <div className={`${classList.join(' ')} ${themeChangePlayer}`}>
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
    </div>
  );
};
