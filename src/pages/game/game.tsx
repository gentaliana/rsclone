import React, { useState } from 'react';
import './game.scss';
import { Keyboard, Field } from '@components';
import Button from 'react-bootstrap/Button';

export const Game = (): JSX.Element => {
  const [currentLetter, setCurrentLetter] = useState('');
  const [isKeyboardHidden, setIsKeyboardHidden] = useState(true);
  const [selectedCell, setSelectedCell] = useState('');

  const handleCurrentLetter = (letter: string) => {
    setIsKeyboardHidden(true);
    setCurrentLetter(letter);
  };

  const handleIsKeyboardHidden = (event: React.MouseEvent) => {
    if ((event.target as HTMLTextAreaElement).classList.contains('cell') && !currentLetter) {
      setIsKeyboardHidden(false);
    } else {
      setIsKeyboardHidden(true);
    }
  };

  const handleClearButton = () => {
    setCurrentLetter('');
    setSelectedCell('');
  };

  return (
    <div>
      <Keyboard
        setCurrentLetter={handleCurrentLetter}
        isKeyboardHidden={isKeyboardHidden}
        handleIsKeyboardHidden={handleIsKeyboardHidden}
      />
      <Field
        currentLetter={currentLetter}
        handleIsKeyboardHidden={handleIsKeyboardHidden}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
      />
      <Button onClick={handleClearButton}> Clear </Button>
    </div>
  );
};
