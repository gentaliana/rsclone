import React, { useState } from 'react';
import './field.scss';
import { useSelector } from 'react-redux';
import { Sound } from '@components';
import { IAppState } from '@types';
import { DEFAULT_FIELD_SIDE_SIZE, MOBILE_FIELD_SIDE_SIZE, MOBILE_WINDOW_SIZE, Theme } from '@constants';
import { useWindowSize } from '@hooks';

type CellProps = {
  isActive: boolean;
  isSelected: boolean;
  isFocused: boolean;
  letter: string;
  handleSelectedCell: () => void;
};

export const Cell = ({ isActive, isSelected, isFocused, letter, handleSelectedCell }: CellProps): JSX.Element => {
  const [isPlay, setIsPlay] = useState<boolean>(false);

  const size = useWindowSize();
  const fieldSize = useSelector((state: IAppState) => state.game.fieldSize);
  const themeInitial = useSelector((state: IAppState) => state.settings.currentTheme);
  const isSoundMuteOn = useSelector((state: IAppState) => state.settings.isSoundOn);
  const themeChange = themeInitial === Theme.light ? 'cell-light' : 'cell-dark';

  const handlePlay = () => setIsPlay(true);

  const getClassName = () => {
    const classes = [`cell ${themeChange}`];
    if (isActive) {
      classes.push('active');
    }
    if (isSelected) {
      classes.push('selected');
    }
    if (isFocused) {
      classes.push('focused');
    }
    return classes.join(' ');
  };

  const cellSize = size > MOBILE_WINDOW_SIZE ? DEFAULT_FIELD_SIDE_SIZE / fieldSize : MOBILE_FIELD_SIDE_SIZE / fieldSize;

  const style = {
    width: cellSize,
    height: cellSize,
  };

  return (
    <div
      className={getClassName()}
      style={style}
      onClick={() => {
        handleSelectedCell();
        handlePlay();
      }}
      role="button"
      tabIndex={-1}
    >
      <Sound playing={isPlay} format={['mp3']} loop={false} mute={!isSoundMuteOn} onEnd={setIsPlay} />
      {letter}
    </div>
  );
};
