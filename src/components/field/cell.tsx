import React from 'react';
import './field.scss';
import { useSelector } from 'react-redux';
import { IAppState } from '@types';
import { DEFAULT_FIELD_SIDE_SIZE, MOBILE_FIELD_SIDE_SIZE, MOBILE_WINDOW_SIZE } from '@constants';
import { useWindowSize } from '@hooks';

type CellProps = {
  isActive: boolean;
  isSelected: boolean;
  isFocused: boolean;
  letter: string;
  handleSelectedCell: () => void;
};

export const Cell = ({ isActive, isSelected, isFocused, letter, handleSelectedCell }: CellProps): JSX.Element => {
  const size = useWindowSize();
  const fieldSize = useSelector((state: IAppState) => state.game.fieldSize);

  const getClassName = () => {
    const classes = ['cell'];
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
    <div className={getClassName()} style={style} onClick={handleSelectedCell} role="button" tabIndex={-1}>
      {letter}
    </div>
  );
};
