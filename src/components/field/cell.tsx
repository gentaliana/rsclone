import React from 'react';
import './field.scss';

type CellProps = {
  isActiveCell: boolean;
  letter: string;
  enteredLetter: string;
  handleSelectedCell: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

export const Cell = ({
  isActiveCell,
  letter,
  enteredLetter,
  handleSelectedCell,
  onKeyDown,
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
      onKeyDown={onKeyDown}
      onClick={handleSelectedCell}
      role="button"
      // eslint-disable-next-line jsx-a11y/tabindex-no-positive
      tabIndex={1}
    >
      {displayLetter()}
    </div>
  );
};
