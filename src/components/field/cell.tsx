import React from 'react';
import './field.scss';

type CellProps = {
  isActiveCell: boolean;
  letter: string;
  enteredLetter: string;
  handleSelectedCell: () => void;
};

export const Cell = ({ isActiveCell, letter, enteredLetter, handleSelectedCell }: CellProps): JSX.Element => {
  const displayLetter = () => {
    if (letter) {
      return letter;
    }
    return enteredLetter && isActiveCell ? enteredLetter : '';
  };

  return (
    <div className={isActiveCell ? 'cell active' : 'cell'} onClick={handleSelectedCell} role="button" tabIndex={-1}>
      {displayLetter()}
    </div>
  );
};
