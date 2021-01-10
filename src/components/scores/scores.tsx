import { IAppState } from '@types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Player, Timer } from '@components';
import './scores.scss';

export const Scores = (): JSX.Element => {
  const player1 = useSelector((state: IAppState) => state.game.player1);
  const player2 = useSelector((state: IAppState) => state.game.player2);

  return (
    <div className="scores">
      <Timer />
      <div className="players">
        <Player />
        <div className="player__points">
          <span>{player1.points}</span> : <span>{player2.points}</span>
        </div>
        <Player isEnemy />
      </div>
    </div>
  );
};
