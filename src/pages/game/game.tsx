import React, { useState } from 'react';
import './game.scss';
import { Keyboard, Field } from '@components';

export const Game = (): JSX.Element => {
  const [currentLetter, setCurrentLetter] = useState('');
  const [isKeyboardHidden, setIsKeyboardHidden] = useState(true);

  const handleCurrentLetter = (letter: string) => {
    setIsKeyboardHidden(true);
    setCurrentLetter(letter);
  };

  const handleIsKeyboardHidden = () => {
    setIsKeyboardHidden(!isKeyboardHidden);
  };

  return (
    <div>
      Game
      {' '}
      <Keyboard
        setCurrentLetter={handleCurrentLetter}
        isKeyboardHidden={isKeyboardHidden}
        handleIsKeyboardHidden={handleIsKeyboardHidden}
      />
      <Field currentLetter={currentLetter} handleIsKeyboardHidden={handleIsKeyboardHidden} />
    </div>
  );
};
