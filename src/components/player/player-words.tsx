import React from 'react';
import './player.scss';
import { IAppState } from '@types';
import { useSelector } from 'react-redux';

type PlayerWordsProps = {
  isEnemy?: boolean;
};

export const PlayerWords = ({ isEnemy }: PlayerWordsProps): JSX.Element => {
  const player1 = useSelector((state: IAppState) => state.game.player1);
  const player2 = useSelector((state: IAppState) => state.game.player2);

  const displayedWords = isEnemy ? player2.words : player1.words;

  const isPlayer1Turn = useSelector((state: IAppState) => state.game.isPlayer1Turn);
  const isEnemyCurrent = isEnemy && !isPlayer1Turn;
  const isGamerCurrent = !isEnemy && isPlayer1Turn;
  const isCurrent = isEnemyCurrent || isGamerCurrent;

  const classList = ['player-words'];

  if (isCurrent) {
    classList.push('player-words--current');
  }

  return (
    <div className={classList.join(' ')}>
      <ol>
        {displayedWords.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ol>
    </div>
  );
};

PlayerWords.defaultProps = {
  isEnemy: false,
};
