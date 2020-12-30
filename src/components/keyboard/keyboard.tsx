import React from 'react';
import './keyboard.scss';
import { ruLetters } from '@constants';
import { IKeyboardLang } from '@types';

type KeyboardProps = {
  setCurrentLetter: (letter: string) => void;
};

export const Keyboard = ({ setCurrentLetter }: KeyboardProps): JSX.Element => {
  const handleClick = (event: React.MouseEvent) => {
    setCurrentLetter((event.target as HTMLTextAreaElement).value);
  };

  const renderLettersRow = (row: Array<IKeyboardLang>) => {
    return row.map((letter) => (
      <button key={letter.name} value={letter.name} onClick={handleClick}>
        {letter.name}
      </button>
    ));
  };

  const renderLetters = () => {
    return ruLetters.map((row: Array<IKeyboardLang>, i) => {
      return <div key={i}>{renderLettersRow(row)}</div>;
    });
  };

  return <div>{renderLetters()}</div>;
};
