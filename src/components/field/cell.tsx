import React from 'react';
import './field.scss';

type CellProps = {
  isActiveCell: boolean;
  letter: string;
  enteredLetter: string;
  handleSelectedCell: () => void;
  onMouseDown: (event: React.SyntheticEvent) => void;
  onMouseUp: (event: React.SyntheticEvent) => void;
  onMouseMove: (event: React.SyntheticEvent) => void;
};

export const Cell = ({
  isActiveCell,
  letter,
  enteredLetter,
  handleSelectedCell,
  onMouseDown,
  onMouseUp,
  onMouseMove,
}: CellProps): JSX.Element => {
  const displayLetter = () => {
    if (letter) {
      return letter;
    }
    return enteredLetter && isActiveCell ? enteredLetter : '';
  };

  return (
    <div
      className={isActiveCell ? 'cell active' : 'cell'}
      onClick={handleSelectedCell}
      role="button"
      tabIndex={-1}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {displayLetter()}
    </div>
  );
};
