import React, { useEffect } from 'react';
import './field.scss';
import chunk from 'lodash/chunk';
import { Cell } from '@components';
import { IAppState } from '@types';
import { useSelector } from 'react-redux';
import { useKeyPress } from '@hooks';

type FieldProps = {
  enteredLetter: string;
  handleIsKeyboardHidden: (event: React.MouseEvent) => void;
  selectedCell: number | null;
  cellFromKeyboard: number | null;
  setSelectedCell: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrWord: React.Dispatch<React.SetStateAction<string>>;
  idsOfChosenLetters: Array<number>;
  cells: Array<string>;
  setIdsOfChosenLetters: (array: Array<number>) => void;
  //   checkAndSetCellLetter: (cellLetter: string, id: number) => boolean;
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
  cellFromKeyboard,
}: //   checkAndSetCellLetter,
FieldProps): JSX.Element => {
  const fieldSize = useSelector((state: IAppState) => state.game.fieldSize);

  const enterPress = useKeyPress('Control');

  const checkAndSetCellLetter = (cellLetter: string, id: number) => {
    if (!enteredLetter && !cellLetter) {
      setSelectedCell(id);
      return true;
    }
    return false;
  };

  const updateCurrWord = (id: number) => {
    setCurrWord((prevState: string) => {
      let word;
      if (cells[id]) {
        word = prevState + cells[id];
      } else if (id === selectedCell) {
        word = prevState + enteredLetter;
      }
      return word || prevState;
    });
  };

  const isRightPosition = (id: number) => {
    const lastLetterId = idsOfChosenLetters[idsOfChosenLetters.length - 1];
    if (typeof lastLetterId === 'undefined') return true;

    const isLetterNextDown = id === lastLetterId + fieldSize;
    const isLetterNextUp = id === lastLetterId - fieldSize;
    const isLetterNextRight = id === lastLetterId + 1;
    const isLetterNextLeft = id === lastLetterId - 1;
    const isLastLetterInSameRow = Math.floor(id / fieldSize) === Math.floor(lastLetterId / fieldSize);

    return (
      (isLetterNextRight && isLastLetterInSameRow) ||
      (isLetterNextLeft && isLastLetterInSameRow) ||
      isLetterNextUp ||
      isLetterNextDown
    );
  };

  const isWrongSelectedLetter = (id: number) => {
    if (!enteredLetter) return false;
    const cellHasLetter = cells[id] || id === selectedCell;
    const wrongSelectedLetter = !(isRightPosition(id) && cellHasLetter && !idsOfChosenLetters.includes(id));
    return wrongSelectedLetter;
  };

  useEffect(() => {
    if (enterPress) {
      if (cellFromKeyboard != null) {
        const isSetLetter = checkAndSetCellLetter(cells[cellFromKeyboard], cellFromKeyboard);
        if (!isSetLetter) {
          if (isWrongSelectedLetter(cellFromKeyboard)) return;
          setIdsOfChosenLetters([...idsOfChosenLetters].concat(cellFromKeyboard));
          updateCurrWord(cellFromKeyboard);
        }
      }
    }
  }, [enterPress]);

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
                cellFromKeyboard={id === cellFromKeyboard}
                isSelected={idsOfChosenLetters.includes(id)}
                enteredLetter={enteredLetter}
                handleSelectedCell={(event: React.MouseEvent) => {
                  if (checkAndSetCellLetter(cellLetter, id)) {
                    handleIsKeyboardHidden(event);
                  } else {
                    //   if (!enteredLetter && !cellLetter) {
                    //     setSelectedCell(id);
                    //     handleIsKeyboardHidden(event);
                    // const cellHasLetter = cellLetter || id === selectedCell;
                    // const wrongSelectedLetter = !(
                    //   isRightPosition(id) &&
                    //   cellHasLetter &&
                    //   !idsOfChosenLetters.includes(id)
                    // );
                    if (isWrongSelectedLetter(id)) return;
                    setIdsOfChosenLetters([...idsOfChosenLetters].concat(id));
                    updateCurrWord(id);
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
