import React, { useState } from 'react';
import './field.scss';
import chunk from 'lodash/chunk';
import { ICell } from '@types';
import { Cell } from '@components';

type FieldProps = {
  currentLetter: string;
  handleIsKeyboardHidden: (event: React.MouseEvent) => void;
  selectedCell: string;
  setSelectedCell: (letter: string) => void;
};

export const Field = ({
  currentLetter,
  handleIsKeyboardHidden,
  selectedCell,
  setSelectedCell,
}: FieldProps): JSX.Element => {
  const fieldSize = 5;
  const [cells] = useState(new Array(fieldSize * fieldSize).fill({ currLetter: null }));

  //   const styles = { width: '40px', height: '40px', float: 'left', textAlign: 'center' };

  return (
    <div className="game-field" role="button" tabIndex={0} onClick={handleIsKeyboardHidden}>
      {chunk(cells, fieldSize).map((item: Array<ICell>, rowIndex: number) => (
        /* eslint-disable  react/no-array-index-key */
        <div key={`cellRow${rowIndex}`} className="cellRow">
          {item.map((cell: ICell, index: number) => (
            <Cell
              isActiveCell={`${rowIndex}${index}` === selectedCell}
              currentLetter={currentLetter}
              setSelectedCell={() => {
                if (!currentLetter) setSelectedCell(`${rowIndex}${index}`);
              }}
              letter={cell.currLetter}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// <div
//   className="game-field"
//   role="button"
//   tabIndex={0}
//   onClick={handleIsKeyboardHidden}
//   onKeyDown={(event) => {
//     if (event.key === '32') {
//       handleIsKeyboardHidden();
//     }
//   }}
// >
//   {currentLetter}
//   <div>Click</div>
// </div>
// );
