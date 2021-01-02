import React from 'react';
import './field.scss';

type CellProps = {
  isActiveCell: boolean;
  letter: string;
  currentLetter: string;
  setSelectedCell: () => void;
};

export const Cell = ({ isActiveCell, letter, currentLetter, setSelectedCell }: CellProps): JSX.Element => {
  const displayLetter = () => {
    if (letter) {
      return letter;
    }
    return currentLetter && isActiveCell ? currentLetter : '';
  };
  return (
    <div className={isActiveCell ? 'cell active' : 'cell'} onClick={setSelectedCell} role="button" tabIndex={0}>
      {displayLetter()}
    </div>
  );
};
