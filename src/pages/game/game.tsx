import React, { useState } from 'react';
import './game.scss';
import { Keyboard, Field } from '@components';
import Button from 'react-bootstrap/Button';

export const Game = (): JSX.Element => {
  const [enteredLetter, setEnteredLetter] = useState('');
  const [isKeyboardHidden, setIsKeyboardHidden] = useState(true);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  const handleCurrentLetter = (letter: string) => {
    setIsKeyboardHidden(true);
    setEnteredLetter(letter);
  };

  const handleIsKeyboardHidden = (event: React.MouseEvent) => {
    if ((event.target as HTMLTextAreaElement).classList.contains('cell') && !enteredLetter) {
      if (isKeyboardHidden) setIsKeyboardHidden(false);
    } else {
      setIsKeyboardHidden(true);
    }
  };

  const handleClearButton = () => {
    setEnteredLetter('');
    setSelectedCell(null);
  };

  return (
    <div>
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
      <Button onClick={handleClearButton}> Clear </Button>
    </div>
  );
};
