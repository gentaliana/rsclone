import React, { useState } from 'react';
import './field.scss';
import chunk from 'lodash/chunk';
import { ICell } from '@types';
import { Cell } from '@components';

type FieldProps = {
  enteredLetter: string;
  handleIsKeyboardHidden: (event: React.MouseEvent) => void;
  selectedCell: number | null;
  setSelectedCell: (letter: number) => void;
  handleKeyPressLetter: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

export const Field = ({
  enteredLetter,
  handleIsKeyboardHidden,
  selectedCell,
  setSelectedCell,
  handleKeyPressLetter,
}: FieldProps): JSX.Element => {
  // TODO брать из redux после начальных настроек
  const fieldSize = 5;
  const [cells] = useState(new Array(fieldSize * fieldSize).fill({ currLetter: null }));

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
                onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
                  if (event.key === 'Enter' && !selectedCell) {
                    setSelectedCell(id);
                  }
                  if (!enteredLetter && id === selectedCell) {
                    handleKeyPressLetter(event);
                  }
                }}
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
