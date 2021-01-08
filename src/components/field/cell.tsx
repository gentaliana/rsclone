import React from 'react';
import './field.scss';

type CellProps = {
  isActive: boolean;
  isSelected: boolean;
  letter: string;
  enteredLetter: string;
  cellFromKeyboard: boolean;
  handleSelectedCell: (event: React.MouseEvent) => void;
};

export const Cell = ({
  isActive,
  isSelected,
  letter,
  enteredLetter,
  handleSelectedCell,
  cellFromKeyboard,
}: CellProps): JSX.Element => {
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
    if (cellFromKeyboard) {
      classes.push('selected-keyboard');
    }
    return classes.join(' ');
  };

  return (
    <div className={getClassName()} onClick={handleSelectedCell} role="button" tabIndex={-1}>
      {displayLetter()}
    </div>
  );
};
