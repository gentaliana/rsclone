import * as React from 'react';
import { useSelector } from 'react-redux';
import { IAppState } from '@types';
import './set-game.css';

export const SetGame = (): JSX.Element => {
  const lang = useSelector((state: IAppState) => state.settings.lang);

  return (
    <div>
      SetGame
      {lang}
    </div>
  );
};
