import React, { useState, useEffect } from 'react';
import './game.scss';
import { Keyboard, Field } from '@components';
import Button from 'react-bootstrap/Button';
import { getLangLetters } from '@constants';
import { useSelector } from 'react-redux';
import { IAppState } from '@types';

export const Game = (): JSX.Element => {
  const [enteredLetter, setEnteredLetter] = useState('');
  const [isKeyboardHidden, setIsKeyboardHidden] = useState(true);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  const handleCurrentLetter = (letter: string) => {
    setIsKeyboardHidden(true);
    setEnteredLetter(letter);
  };

  const lang = useSelector((state: IAppState) => state.settings.lang);

  const handleKeyPressLetter = (event: KeyboardEvent) => {
    const currLetters = getLangLetters(lang);
    const letters = currLetters.flat().map((el) => el.name.toUpperCase());
    if (letters.includes(event.key.toUpperCase())) handleCurrentLetter(event.key.toUpperCase());
  };

  const handleIsKeyboardHidden = (event: React.MouseEvent) => {
    if ((event.target as HTMLTextAreaElement).classList.contains('cell') && !enteredLetter) {
      if (isKeyboardHidden) setIsKeyboardHidden(false);
    } else {
      setIsKeyboardHidden(true);
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPressLetter, false);
  }, []);

  const handleKeyPressKeyboard = (event: React.KeyboardEvent) => {
    if (event.key === ' ') {
      setIsKeyboardHidden(!isKeyboardHidden);
    }
  };

  const handleClearButton = () => {
    setEnteredLetter('');
    setSelectedCell(null);
  };

  return (
    <div onKeyDown={(event) => handleKeyPressKeyboard(event)} role="button" tabIndex={0}>
      <Keyboard
        setCurrentLetter={handleCurrentLetter}
        isKeyboardHidden={isKeyboardHidden}
        handleIsKeyboardHidden={handleIsKeyboardHidden}
      />
      <Field
        enteredLetter={enteredLetter}
        handleIsKeyboardHidden={handleIsKeyboardHidden}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
      />
      <Button disabled={!isKeyboardHidden} onClick={handleClearButton}>
        {' '}
        Clear{' '}
      </Button>
    </div>
  );
};
