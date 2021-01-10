import { IAppState } from '@types';
import React from 'react';
import { useSelector } from 'react-redux';
import './player.scss';

type PlayerProps = {
  isEnemy?: boolean;
};

export const Player: React.FC<PlayerProps> = ({ isEnemy = false }) => {
  const isPlayer1Turn = useSelector((state: IAppState) => state.game.isPlayer1Turn);

  const name = useSelector((state: IAppState) => state.settings.gamerName);
  const secondGamerName = useSelector((state: IAppState) => state.settings.secondGamerName);
  const isEnemyCurrent = isEnemy && !isPlayer1Turn;
  const isGamerCurrent = !isEnemy && isPlayer1Turn;
  const isCurrent = isEnemyCurrent || isGamerCurrent;
  const gamerName = isEnemy ? secondGamerName : name;

  const classList = ['player'];

  if (isCurrent) {
    classList.push('player--current');
  }

  return (
    <div className={classList.join(' ')}>
      <span className="player__name">{gamerName}</span>
    </div>
  );
};
