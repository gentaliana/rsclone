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
};

export const Field = ({
  enteredLetter,
  handleIsKeyboardHidden,
  selectedCell,
  setSelectedCell,
}: FieldProps): JSX.Element => {
  // TODO брать из redux после начальных настроек
  const fieldSize = 5;
  const [cells] = useState(new Array(fieldSize * fieldSize).fill({ currLetter: null }));

  const downPress = useKeyPress('ArrowDown');
  const upPress = useKeyPress('ArrowUp');
  const leftPress = useKeyPress('ArrowLeft');
  const rightPress = useKeyPress('ArrowRight');

  useEffect(() => {
    if (downPress) {
      setSelectedCell((prevState: number | null) => {
        if (enteredLetter) {
          return prevState;
        }
        if (prevState === null) {
          return 0;
        }
        if (prevState + fieldSize < cells.length) {
          console.log(prevState + fieldSize);
          return prevState + fieldSize;
        }
        return prevState;
      });
    }
  }, [downPress]);

  useEffect(() => {
    if (upPress) {
      setSelectedCell((prevState: number | null) => {
        if (enteredLetter) {
          return prevState;
        }
        if (prevState === null) {
          return 0;
        }
        if (prevState - fieldSize >= 0) {
          console.log(prevState - fieldSize);
          return prevState - fieldSize;
        }
        return prevState;
      });
    }
  }, [upPress]);

  useEffect(() => {
    if (leftPress) {
      setSelectedCell((prevState: number | null) => {
        if (enteredLetter) {
          return prevState;
        }
        if (prevState === null) {
          return 0;
        }
        if (prevState - 1 >= 0) {
          console.log(prevState - 1);
          return prevState - 1;
        }
        return prevState;
      });
    }
  }, [leftPress]);

  useEffect(() => {
    if (rightPress) {
      setSelectedCell((prevState: number | null) => {
        if (enteredLetter) {
          return prevState;
        }
        if (prevState === null) {
          return 0;
        }
        if (prevState + 1 < cells.length) {
          console.log(prevState - 1);
          return prevState + 1;
        }
        return prevState;
      });
    }
  }, [rightPress]);

  return (
    <div className="game-field" role="button" tabIndex={0} onClick={handleIsKeyboardHidden}>
      {chunk(cells, fieldSize).map((item: Array<ICell>, rowIndex: number) => (
        /* eslint-disable  react/no-array-index-key */
        <div key={`cellRow${rowIndex}`} className="cellRow">
          {item.map((cell: ICell, index: number) => {
            const id = rowIndex * fieldSize + index;
            return (
              <Cell
                key={id}
                isActiveCell={id === selectedCell}
                enteredLetter={enteredLetter}
                handleSelectedCell={() => {
                  if (!enteredLetter) {
                    setSelectedCell(id);
                  } else {
                    // TODO в этом случае буква уже выбрана, у cell после клика
                    // другая подсветка и уже набираем по буквам слово
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
