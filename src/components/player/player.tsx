import { IAppState } from '@types';
import React from 'react';
import { useSelector } from 'react-redux';
import './player.scss';

type PlayerProps = {
  playerId: number;
};

export const Player: React.FC<PlayerProps> = ({ playerId }: PlayerProps) => {
  const gamerName = useSelector((state: IAppState) => state.settings.gamerNames[playerId]);
  const playerTurnId = useSelector((state: IAppState) => state.game.playerTurnId);
  const isCurrent = playerTurnId === playerId;

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
