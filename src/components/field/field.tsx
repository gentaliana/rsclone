import React, { useState, useEffect } from 'react';
import './field.scss';
import chunk from 'lodash/chunk';
import { IAppState } from '@types';
import { Cell } from '@components';
import { useKeyPress } from '@hooks';
import { initCells } from '@utils';
import { useSelector } from 'react-redux';

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
  const fieldSize = useSelector((state: IAppState) => state.game.fieldSize);
  const firstWord = useSelector((state: IAppState) => state.game.firstWord);
  const [cells, setCells] = useState(initCells(fieldSize, firstWord));

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

  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');

  const updateSelection = (event: React.SyntheticEvent, id: number, letter: string | null) => {
    if (selecting && !selected.includes(id)) {
      const word = !letter ? currentWord : currentWord + letter;
      setSelected([...selected, id]);
      setCurrentWord(word);
      event.currentTarget.classList.add('selected');
    }
  };

  const beginSelection = (event: React.SyntheticEvent, id: number, letter: string | null) => {
    if (selectedCell && enteredLetter) {
      setSelecting(true);
      updateSelection(event, id, letter);
    }
  };

  const endSelection = (event: React.SyntheticEvent, id: number, letter: string | null) => {
    if (selectedCell && enteredLetter) {
      setSelecting(false);
      updateSelection(event, id, letter);
      const field = cells.slice();
      field[selectedCell] = enteredLetter;

      setCells(field);

      setCurrentWord('');
      setSelected([]);
    }
  };

  return (
    <div className="game-field" role="button" tabIndex={0} onClick={handleIsKeyboardHidden}>
      {chunk(cells, fieldSize).map((item: string[], rowIndex: number) => (
        /* eslint-disable  react/no-array-index-key */
        <div key={`cellRow${rowIndex}`} className="cellRow">
          {item.map((cell: string, index: number) => {
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
                letter={cell}
                onMouseDown={(event) => beginSelection(event, id, cell)}
                onMouseUp={(event) => endSelection(event, id, cell)}
                onMouseMove={(event) => updateSelection(event, id, cell)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
