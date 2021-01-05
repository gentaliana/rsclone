import React, { useState, useEffect } from 'react';
import './field.scss';
import chunk from 'lodash/chunk';
import { ICell } from '@types';
import { Cell } from '@components';
import { useKeyPress } from '@hooks';

type FieldProps = {
  enteredLetter: string;
  handleIsKeyboardHidden: (event: React.MouseEvent) => void;
  selectedCell: number | null;
  setSelectedCell: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrWord: React.Dispatch<React.SetStateAction<string>>;
};

export const Field = ({
  enteredLetter,
  handleIsKeyboardHidden,
  selectedCell,
  setSelectedCell,
  setCurrWord,
}: FieldProps): JSX.Element => {
  // TODO брать из redux после начальных настроек
  const fieldSize = 5;
  let [cells] = useState(new Array(fieldSize * fieldSize).fill({ currLetter: null }));
  const [idsOfChosenLetters, setIdsOfChosenLetters] = useState<Array<number>>([]);

  const addInitialWord = (array: any) => {
    const start = Math.floor(fieldSize / 2) * fieldSize - 1;
    const end = start + fieldSize + 1;
    return array.map((el: ICell, idx: number) => {
      if (idx > start && idx < end) {
        return { ...el, currLetter: 'A' };
      }
      return el;
    });
  };

  cells = addInitialWord(cells);

  const downPress = useKeyPress('ArrowDown');
  const upPress = useKeyPress('ArrowUp');
  const leftPress = useKeyPress('ArrowLeft');
  const rightPress = useKeyPress('ArrowRight');

  useEffect(() => {
    if (downPress || upPress || leftPress || rightPress) {
      setSelectedCell((prevState: number | null) => {
        if (enteredLetter) {
          return prevState;
        }
        if (prevState === null) {
          return 0;
        }

        const moveDownIsPossible = prevState + fieldSize < cells.length;
        const moveUpIsPossible = prevState - fieldSize >= 0;
        const moveLeftIsPossible = prevState - 1 >= 0;
        const moveRightIsPossible = prevState + 1 < cells.length;

        if (downPress && moveDownIsPossible) {
          return prevState + fieldSize;
        }

        if (upPress && moveUpIsPossible) {
          return prevState - fieldSize;
        }

        if (leftPress && moveLeftIsPossible) {
          return prevState - 1;
        }
        if (rightPress && moveRightIsPossible) {
          return prevState + 1;
        }
        return prevState;
      });
    }
  }, [downPress, upPress, leftPress, rightPress]);

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
                    if (idsOfChosenLetters.includes(id)) return;
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
