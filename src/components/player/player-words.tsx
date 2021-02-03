import React from 'react';
import './player.scss';
import { WordsComponent } from '@components';
import { IAppState } from '@types';
import { useSelector } from 'react-redux';
import { Theme } from '@constants';

type PlayerWordsProps = {
  playerId: number;
};

export const PlayerWords = ({ playerId }: PlayerWordsProps): JSX.Element => {
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
      <WordsComponent playerId={playerId} />
    </div>
  );
};
