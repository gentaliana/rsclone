import React from 'react';
import './keyboard.scss';
import { ruLetters } from '@constants';
import { IKeyboardLang } from '@types';

export const Keyboard = (): JSX.Element => {

  const renderLettersRow = (row: Array<IKeyboardLang>) => {
    return row.map((letter) => <button key={letter.name}>{letter.name}</button>);
  };
  const renderLetters = () => {
    return ruLetters.map((row: Array<IKeyboardLang>, i) => {
      return <div key={i} >{renderLettersRow(row)}</div>;
    });
  };

  return <div>{renderLetters()}</div>;
};
