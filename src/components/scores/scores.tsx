import React from 'react';
import { Player, Timer } from '@components';
import './scores.scss';

export const Scores = (): JSX.Element => (
  <div className="scores">
    <div className="players">
      <Player />
      :
      <Player isEnemy />
    </div>
    <Timer />
  </div>
);
