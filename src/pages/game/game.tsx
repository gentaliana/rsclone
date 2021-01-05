import React, { useState, useEffect } from 'react';
import './game.scss';
import { Keyboard, Field } from '@components';
import Button from 'react-bootstrap/Button';
import { getLangLetters } from '@constants';
import { useSelector } from 'react-redux';
import { IAppState } from '@types';
import { useKeyPress } from '@hooks';
import { useTranslation } from 'react-i18next';

export const Game = (): JSX.Element => {
  const [enteredLetter, setEnteredLetter] = useState('');
  const [isKeyboardHidden, setIsKeyboardHidden] = useState(true);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  const escPress = useKeyPress('Escape');
  const spacePress = useKeyPress(' ');

  const { t } = useTranslation();

  const handleClearButton = () => {
    setEnteredLetter('');
    setSelectedCell(null);
    setIsKeyboardHidden(true);
  };

  const handleCurrentLetter = (letter: string) => {
    setIsKeyboardHidden(true);
    setEnteredLetter(letter);
  };

  useEffect(() => {
    if (escPress) handleClearButton();
    if (spacePress && !enteredLetter && selectedCell) {
      setIsKeyboardHidden(!isKeyboardHidden);
    }
  }, [escPress, spacePress]);

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

  return (
    <div role="button" tabIndex={0}>
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
        {t('buttons.cancel')}
      </Button>
    </div>
  );
};
