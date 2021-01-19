import React from 'react';
import './player.scss';
import { IAppState } from '@types';
import { useSelector } from 'react-redux';
import { PLAYERS_ID } from '@constants';

type PlayerWordsProps = {
  playerId: number;
};

export const PlayerWords = ({ playerId }: PlayerWordsProps): JSX.Element => {
  const player1 = useSelector((state: IAppState) => state.game.player1);
  const player2 = useSelector((state: IAppState) => state.game.player2);

  const displayedWords = playerId === PLAYERS_ID.SECOND_GAMER_ID ? player2.words : player1.words;
  const playerTurnId = useSelector((state: IAppState) => state.game.playerTurnId);
  const isCurrent = playerTurnId === playerId;

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
