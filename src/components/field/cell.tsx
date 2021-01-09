import React from 'react';
import './field.scss';

type CellProps = {
  isActive: boolean;
  isSelected: boolean;
  isFocused: boolean;
  letter: string;
  handleSelectedCell: () => void;
};

export const Cell = ({ isActive, isSelected, isFocused, letter, handleSelectedCell }: CellProps): JSX.Element => {
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

  return (
    <div className={getClassName()} onClick={handleSelectedCell} role="button" tabIndex={-1}>
      {letter}
    </div>
  );
};
