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

  return (
    <div className="player-words">
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
