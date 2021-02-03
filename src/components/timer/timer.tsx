import { secondsToTime } from '@utils';
import React, { useRef } from 'react';
import './timer.scss';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { IAppState } from '@types';
import { useSelector } from 'react-redux';
import { useWindowSize } from '@hooks';
import { MOBILE_WINDOW_SIZE, DEFAULT_TIMER_SIZE, MOBILE_TIMER_SIZE } from '@constants';

type RenderTimeProps = {
  remainingTime: number;
};

const renderTime = ({ remainingTime }: RenderTimeProps): JSX.Element => {
  const currentTime = useRef(remainingTime);
  const prevTime = useRef<number | null>(null);
  const isNewTimeFirstTick = useRef(false);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  const isTimeUp = isNewTimeFirstTick.current;

  const timeFormat = (time: number | null) => {
    if (time === null) return '0:00';
    return `${secondsToTime(time).m}:${secondsToTime(time).s}`;
  };

  return (
    <div className="time-wrapper">
      <div key={remainingTime} className={`time ${isTimeUp ? 'up' : ''}`}>
        {timeFormat(remainingTime)}
      </div>
      {prevTime.current !== null && (
        <div key={prevTime.current} className={`time ${!isTimeUp ? 'down' : ''}`}>
          {timeFormat(prevTime.current)}
        </div>
      )}
    </div>
  );
};

type TimerProps = {
  onComplete: () => void;
  timerKey: number;
};

export const Timer = ({ onComplete, timerKey }: TimerProps): JSX.Element => {
  const size = useWindowSize();
  const timerSize = size > MOBILE_WINDOW_SIZE ? DEFAULT_TIMER_SIZE : MOBILE_TIMER_SIZE;
  const time = useSelector((state: IAppState) => state.game.time);
  const isGameEnded = useSelector((state: IAppState) => state.game.winnerId === null);

  return time > 0 ? (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        isPlaying={isGameEnded}
        key={timerKey}
        duration={time * 60}
        onComplete={onComplete}
        size={timerSize}
        strokeWidth={6}
        colors={[
          ['#004777', 0.33],
          ['#F7B801', 0.33],
          ['#A30000', 0.33],
        ]}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  ) : (
    <></>
  );
};
