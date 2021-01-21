import React from 'react';
import './player.scss';
import { IAppState } from '@types';
import { useSelector } from 'react-redux';
import { PLAYERS_ID, Theme } from '@constants';

type PlayerWordsProps = {
  playerId: number;
};

export const PlayerWords = ({ playerId }: PlayerWordsProps): JSX.Element => {
  const player1 = useSelector((state: IAppState) => state.game.player1);
  const player2 = useSelector((state: IAppState) => state.game.player2);

  const displayedWords = playerId === PLAYERS_ID.SECOND_GAMER_ID ? player2.words : player1.words;
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
          <li key={word}>{word}</li>
        ))}
      </ol>
    </div>
  );
};
