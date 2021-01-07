import React from 'react';
import './field.scss';
import chunk from 'lodash/chunk';
import { Cell } from '@components';
import { IAppState } from '@types';
import { useSelector } from 'react-redux';

type FieldProps = {
  enteredLetter: string;
  handleIsKeyboardHidden: (event: React.MouseEvent) => void;
  selectedCell: number | null;
  setSelectedCell: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrWord: React.Dispatch<React.SetStateAction<string>>;
  idsOfChosenLetters: Array<number>;
  cells: Array<string>;
  setIdsOfChosenLetters: (array: Array<number>) => void;
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
  const fieldSize = useSelector((state: IAppState) => state.game.fieldSize);

  const updateCurrWord = (cellLetter: string, id: number) => {
    setCurrWord((prevState: string) => {
      let word;
      if (cellLetter) {
        word = prevState + cellLetter;
      } else if (id === selectedCell) {
        word = prevState + enteredLetter;
      }
      return word || prevState;
    });
  };

  const isRightPosition = (id: number) => {
    if (!enteredLetter) return false;
    const lastLetterId = idsOfChosenLetters[idsOfChosenLetters.length - 1];
    if (typeof lastLetterId === 'undefined') return true;

    const isLetterNextDown = id === lastLetterId + fieldSize;
    const isLetterNexUp = id === lastLetterId - fieldSize;
    const isLetterNexRight = id === lastLetterId + 1;
    const isLetterNexLet = id === lastLetterId - 1;
    const isLastLetterInSameRow = Math.floor(id / fieldSize) === Math.floor(lastLetterId / fieldSize);

    return (
      (isLetterNexRight && isLastLetterInSameRow) ||
      (isLetterNexLet && isLastLetterInSameRow) ||
      isLetterNexUp ||
      isLetterNextDown
    );
  };

  return (
    <div className="game-field" role="button" tabIndex={0}>
      {chunk(cells, fieldSize).map((item: string[], rowIndex: number) => (
        /* eslint-disable  react/no-array-index-key */
        <div key={`cellRow${rowIndex}`} className="cellRow">
          {item.map((cellLetter: string, index: number) => {
            const id = rowIndex * fieldSize + index;
            return (
              <Cell
                key={id}
                isActive={id === selectedCell}
                isSelected={idsOfChosenLetters.includes(id)}
                enteredLetter={enteredLetter}
                handleSelectedCell={(event: React.MouseEvent) => {
                  if (!enteredLetter && !cellLetter) {
                    setSelectedCell(id);
                    handleIsKeyboardHidden(event);
                  } else {
                    const cellHasLetter = cellLetter || id === selectedCell;
                    const wrongSelectedLetter = !(
                      isRightPosition(id) &&
                      cellHasLetter &&
                      !idsOfChosenLetters.includes(id)
                    );
                    if (wrongSelectedLetter) return;
                    const joined = [...idsOfChosenLetters].concat(id);
                    setIdsOfChosenLetters(joined);
                    updateCurrWord(cellLetter, id);
                  }
                }}
                letter={cellLetter}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
