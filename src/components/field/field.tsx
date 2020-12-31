import * as React from 'react';
import './field.scss';

type FieldProps = {
  currentLetter: string;
  handleIsKeyboardHidden: () => void;
};

export const Field = ({ currentLetter, handleIsKeyboardHidden }: FieldProps): JSX.Element => (
  <div
    className ="game-field"
    role="button"
    tabIndex={0}
    onClick={handleIsKeyboardHidden}
    onKeyDown={(event) => {
      if (event.key === '32') {
        handleIsKeyboardHidden();
      }
    }}
  >
    {currentLetter}
    <div>Click</div>
  </div>
);
