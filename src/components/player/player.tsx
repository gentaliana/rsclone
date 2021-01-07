import { IAppState } from '@types';
import React from 'react';
import { useSelector } from 'react-redux';
import './player.scss';

type PlayerProps = {
  isEnemy?: boolean;
};

export const Player: React.FC<PlayerProps> = ({ isEnemy = false }) => {
  const isPlayer1Turn = useSelector((state: IAppState) => state.game.isPlayer1Turn);
  const player1 = useSelector((state: IAppState) => state.game.player1);
  const player2 = useSelector((state: IAppState) => state.game.player2);

  const name = useSelector((state: IAppState) => state.settings.gamerName);
  const secondGamerName = useSelector((state: IAppState) => state.settings.secondGamerName);
  const isEnemyCurrent = isEnemy && !isPlayer1Turn;
  const isGamerCurrent = !isEnemy && isPlayer1Turn;
  const isCurrent = isEnemyCurrent || isGamerCurrent;
  const gamerName = isEnemy ? secondGamerName : name;
  const points = !isEnemy ? player1.points : player2.points;

  const classList = ['player'];
  if (isEnemy) {
    classList.push('player--enemy');
  }

  if (isCurrent) {
    classList.push('player--current');
  }

  return (
    <div className={classList.join(' ')}>
      <span className="player__name">{gamerName}</span>
      <span className="player__points">{points}</span>
    </div>
  );
};
