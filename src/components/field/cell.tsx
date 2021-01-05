import React from 'react';
import './field.scss';

type CellProps = {
  isActive: boolean;
  isSelected: boolean;
  letter: string;
  enteredLetter: string;
  handleSelectedCell: (event: React.MouseEvent) => void;
};

export const Cell = ({ isActive, isSelected, letter, enteredLetter, handleSelectedCell }: CellProps): JSX.Element => {
  const displayLetter = () => {
    if (letter) {
      return letter;
    }
    return enteredLetter && isActive ? enteredLetter : '';
  };

  const getClassName = () => {
    const classes = ['cell'];
    if (isActive) {
      classes.push('active');
    }
    if (isSelected) {
      classes.push('selected');
    }
    return classes.join(' ');
  };

  return (
    <div className={getClassName()} onClick={handleSelectedCell} role="button" tabIndex={-1}>
      {displayLetter()}
    </div>
  );
};
