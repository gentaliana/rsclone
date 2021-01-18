import { IAppState } from '@types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Player, Timer } from '@components';
import './scores.scss';
import { PLAYERS_ID } from '@constants';

type ScoresProps = {
  onTimerComplete: () => void;
  timerKey: number;
};

export const Scores = ({ onTimerComplete, timerKey }: ScoresProps): JSX.Element => {
  const player1 = useSelector((state: IAppState) => state.game.player1);
  const player2 = useSelector((state: IAppState) => state.game.player2);

  return (
    <div className="scores">
      <div className="players">
        <Player playerId={PLAYERS_ID.FIRST_GAMER_ID} />
        <div className="player__points">
          <span>{player1.points}</span> <Timer onComplete={onTimerComplete} timerKey={timerKey} />
          <span>{player2.points}</span>
        </div>
        <Player playerId={PLAYERS_ID.SECOND_GAMER_ID} />
      </div>
    </div>
  );
};
