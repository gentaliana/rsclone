import React, { useEffect } from 'react';
import './field.scss';
import chunk from 'lodash/chunk';
import { Cell } from '@components';
import { IAppState } from '@types';
import { useSelector } from 'react-redux';
import { useKeyPress } from '@hooks';

type FieldProps = {
  handleMouseSelectCell: (index: number) => void;
  selectedCell: number | null;
  focusedCell: number | null;
  setCurrWord: React.Dispatch<React.SetStateAction<string>>;
  idsOfChosenLetters: Array<number>;
  canSelect: boolean;
  cells: Array<string>;
  setIdsOfChosenLetters: (array: Array<number>) => void;
};

export const Field = ({
  handleMouseSelectCell,
  selectedCell,
  setCurrWord,
  idsOfChosenLetters,
  setIdsOfChosenLetters,
  canSelect,
  cells,
  focusedCell,
}: FieldProps): JSX.Element => {
  const fieldSize = useSelector((state: IAppState) => state.game.fieldSize);

  const spacePress = useKeyPress(' ');

  const addLastLetterCurrWord = (id: number) => {
    setCurrWord((prevState: string) => {
      let word;
      if (cells[id]) {
        word = prevState + cells[id];
      }
      return word || prevState;
    });
  };

  const deleteLastLetterCurrWord = () => {
    setCurrWord((prevState: string) => prevState.substring(0, prevState.length - 1));
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
    const cellHasLetter = cells[id] || id === selectedCell;
    const wrongSelectedLetter = !(isRightPosition(id) && cellHasLetter && !idsOfChosenLetters.includes(id));
    return wrongSelectedLetter;
  };

  const isClickOnLastLetter = (id: number) => {
    const lastHighlightedLetter = id === idsOfChosenLetters[idsOfChosenLetters.length - 1];
    if (lastHighlightedLetter) {
      setIdsOfChosenLetters(idsOfChosenLetters.slice(0, -1));
      deleteLastLetterCurrWord();
      return true;
    }
    return false;
  };

  const checkNextCell = (id: number) => {
    if (isClickOnLastLetter(id)) return;
    if (isWrongSelectedLetter(id)) return;
    setIdsOfChosenLetters([...idsOfChosenLetters].concat(id));
    addLastLetterCurrWord(id);
  };

  useEffect(() => {
    if (spacePress && canSelect) {
      if (focusedCell != null && cells[focusedCell]) {
        checkNextCell(focusedCell);
      }
    }
  }, [spacePress]);

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
                isFocused={id === focusedCell}
                isSelected={idsOfChosenLetters.includes(id)}
                letter={cellLetter}
                handleSelectedCell={() => {
                  if (canSelect) {
                    checkNextCell(id);
                  } else if (cellLetter === '') {
                    handleMouseSelectCell(id);
                  }
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
