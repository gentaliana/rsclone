import React from 'react';
import './field.scss';
import chunk from 'lodash/chunk';
import { ICell } from '@types';
import { Cell } from '@components';

type FieldProps = {
  enteredLetter: string;
  handleIsKeyboardHidden: (event: React.MouseEvent) => void;
  selectedCell: number | null;
  setSelectedCell: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrWord: React.Dispatch<React.SetStateAction<string>>;
  idsOfChosenLetters: Array<number>;
  setIdsOfChosenLetters: (array: Array<number>) => void;
  cells: Array<ICell>;
};

export const Field = ({
  enteredLetter,
  handleIsKeyboardHidden,
  selectedCell,
  setSelectedCell,
  setCurrWord,
  idsOfChosenLetters,
  setIdsOfChosenLetters,
  cells,
}: FieldProps): JSX.Element => {
  // TODO брать из redux после начальных настроек + cells
  const fieldSize = 5;

  const isRightPosition = (id: number) => {
    if (!enteredLetter) return false;
    const lastLetterId = idsOfChosenLetters[idsOfChosenLetters.length - 1];
    if (typeof lastLetterId === 'undefined') return true;
    if (
      (id === lastLetterId + 1 && Math.floor(id / fieldSize) === Math.floor(lastLetterId / fieldSize)) ||
      (id === lastLetterId - 1 && Math.floor(id / fieldSize) === Math.floor(lastLetterId / fieldSize)) ||
      id === lastLetterId - fieldSize ||
      id === lastLetterId + fieldSize
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="game-field" role="button" tabIndex={0}>
      {chunk(cells, fieldSize).map((item: Array<ICell>, rowIndex: number) => (
        /* eslint-disable  react/no-array-index-key */
        <div key={`cellRow${rowIndex}`} className="cellRow">
          {item.map((cell: ICell, index: number) => {
            const id = rowIndex * fieldSize + index;
            return (
              <Cell
                key={id}
                isActive={id === selectedCell}
                isSelected={idsOfChosenLetters.includes(id)}
                enteredLetter={enteredLetter}
                handleSelectedCell={(event: React.MouseEvent) => {
                  if (!enteredLetter && !cell.currLetter) {
                    setSelectedCell(id);
                    handleIsKeyboardHidden(event);
                  } else {
                    if (
                      !(
                        isRightPosition(id) &&
                        (cell.currLetter || id === selectedCell) &&
                        !idsOfChosenLetters.includes(id)
                      )
                    )
                      return;
                    const joined = [...idsOfChosenLetters].concat(id);
                    setIdsOfChosenLetters(joined);
                    // console.log(idsOfChosenLetters);
                    setCurrWord((prevState: string) => {
                      let word;
                      if (cell.currLetter) {
                        word = prevState + cell.currLetter;
                      } else if (id === selectedCell) {
                        word = prevState + enteredLetter;
                      }
                      return word || prevState;
                    });
                  }
                }}
                letter={cell.currLetter}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
