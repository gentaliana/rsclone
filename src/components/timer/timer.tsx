import { IAppState } from '@types';
import { secondsToTime } from '@utils';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './timer.scss';

export const Timer = (): JSX.Element => {
  const time = useSelector((state: IAppState) => state.game.time);
  const [counter, setCounter] = useState(time * 60);

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => (typeof timer !== 'boolean' ? clearInterval(timer) : undefined);
  });

  const formatTime = secondsToTime(counter);

  const renderTime = time > 0 ? `${formatTime.m} : ${formatTime.s}` : null;

  return <div className="timer">{renderTime}</div>;
};
