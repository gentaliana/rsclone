import React from 'react';
import './field.scss';
import { useSelector } from 'react-redux';
import { IAppState } from '@types';
import { DEFAULT_FIELD_SIDE_SIZE } from '@constants';

type CellProps = {
  isActive: boolean;
  isSelected: boolean;
  isFocused: boolean;
  letter: string;
  handleSelectedCell: () => void;
};

export const Cell = ({ isActive, isSelected, isFocused, letter, handleSelectedCell }: CellProps): JSX.Element => {
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

  const style = {
    width: DEFAULT_FIELD_SIDE_SIZE / fieldSize,
    height: DEFAULT_FIELD_SIDE_SIZE / fieldSize,
  };

  return (
    <div className={getClassName()} style={style} onClick={handleSelectedCell} role="button" tabIndex={-1}>
      {letter}
    </div>
  );
};
