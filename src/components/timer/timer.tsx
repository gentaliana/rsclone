import { secondsToTime } from '@utils';
import React, { useState, useRef } from 'react';
import './timer.scss';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { nextTurn } from '@store';
import { IAppState } from '@types';
import { useSelector, useDispatch } from 'react-redux';

type RenderTimeProps = {
  remainingTime: number;
};

const renderTime = ({ remainingTime }: RenderTimeProps): JSX.Element => {
  const currentTime = useRef(remainingTime);
  const prevTime = useRef<number | null>(null);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);

  // force one last re-render when the time is over to trigger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender((val) => val + 1);
    }, 20);
  }
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
  resetState: () => void;
  timerKey: number;
};

export const Timer = ({ resetState, timerKey }: TimerProps): JSX.Element => {
  const time = useSelector((state: IAppState) => state.game.time);
  const dispatch = useDispatch();
  const setNextTurn = () => dispatch(nextTurn());

  return time > 0 ? (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        isPlaying
        key={timerKey}
        duration={time * 60}
        onComplete={() => {
          resetState();
          setNextTurn();
        }}
        size={80}
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
