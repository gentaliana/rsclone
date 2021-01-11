import { secondsToTime } from '@utils';
import React, { useState, useRef } from 'react';
import './timer.scss';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { setGame } from '@store';
import { IAppState, IGameState } from '@types';
import { useSelector, useDispatch } from 'react-redux';

const renderTime = ({ remainingTime }: any) => {
  const currentTime = useRef(remainingTime);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender((val) => val + 1);
    }, 20);
  }

  const isTimeUp = isNewTimeFirstTick.current;

  const children = (time: number | null) => {
    if (time === null) return '0:00';
    return `${secondsToTime(time).m}:${secondsToTime(time).s}`;
  };

  return (
    <div className="time-wrapper">
      <div key={remainingTime} className={`time ${isTimeUp ? 'up' : ''}`}>
        {children(remainingTime)}
      </div>
      {prevTime.current !== null && (
        <div key={prevTime.current} className={`time ${!isTimeUp ? 'down' : ''}`}>
          {children(prevTime.current)}
        </div>
      )}
    </div>
  );
};

export const Timer = (): JSX.Element => {
  const time = useSelector((state: IAppState) => state.game.time);
  // console.log(time);
  // const [counter, setCounter] = useState(time * 60);

  // useEffect(() => {
  //   const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
  //   return () => (typeof timer !== 'boolean' ? clearInterval(timer) : undefined);
  // });

  // const formatTime = secondsToTime(counter);

  // const renderTime = time > 0 ? `${formatTime.m} : ${formatTime.s}` : null;
  // return <div className="timer">{renderTime}</div>;
  const game = useSelector((state: IAppState) => state.game);
  const dispatch = useDispatch();

  const setGameSettings = (settings: IGameState) => dispatch(setGame(settings));

  return (
    <CountdownCircleTimer
      isPlaying
      duration={time * 60}
      onComplete={() => {
        setGameSettings({
          ...game,
          isPlayer1Turn: !game.isPlayer1Turn,
        });
        return [true, 1000]; // repeat animation in 1 second
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
  );
};
