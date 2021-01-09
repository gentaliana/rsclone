import React, { useState, useEffect } from 'react';
import './game.scss';
import { Keyboard, Field, WordField, Scores } from '@components';
import Button from 'react-bootstrap/Button';
import { getLangLetters } from '@constants';
import { useSelector } from 'react-redux';
import { IAppState } from '@types';
import { useKeyPress, useSymbolKeyPress } from '@hooks';
import { useTranslation } from 'react-i18next';
import { initCells } from '@utils';

export const Game = (): JSX.Element => {
  const [enteredLetter, setEnteredLetter] = useState('');
  const [isKeyboardHidden, setIsKeyboardHidden] = useState(true);
  // current focused cell by keyboard / mouse
  const [focusedCell, setFocusedCell] = useState<number | null>(null);
  // a cell with selected new letter
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [currWord, setCurrWord] = useState<string>('');
  const [idsOfChosenLetters, setIdsOfChosenLetters] = useState<Array<number>>([]);

  const fieldSize = useSelector((state: IAppState) => state.game.fieldSize);
  const firstWord = useSelector((state: IAppState) => state.game.firstWord);
  const [cells, setCells] = useState(initCells(fieldSize, firstWord));
  const [infoMessage, setInfoMessage] = useState('Please, enter the letter');

  const escPress = useKeyPress('Escape');
  const downPress = useKeyPress('ArrowDown');
  const upPress = useKeyPress('ArrowUp');
  const leftPress = useKeyPress('ArrowLeft');
  const rightPress = useKeyPress('ArrowRight');
  const enterPress = useKeyPress('Enter');
  const shiftPress = useKeyPress('Shift');
  const symbolPressed = useSymbolKeyPress();

  const { t } = useTranslation();
  const lang = useSelector((state: IAppState) => state.settings.lang);

  const setLetterInCells = (letter: string, pos: number) => {
    const newCells = [...cells];
    newCells[pos] = letter;
    setCells(newCells);
  };

  const resetState = (skipLetterClean?: boolean | null) => {
    if (!skipLetterClean && enteredLetter && selectedCell) {
      setLetterInCells('', selectedCell);
    }
    setEnteredLetter('');
    setSelectedCell(null);
    setIsKeyboardHidden(true);
    setIdsOfChosenLetters([]);
    setCurrWord('');
  };

  const handleClearButton = () => resetState(false);

  const handleSubmitButton = () => {
    if (currWord.length === 0) {
      setInfoMessage('You did not choose any letters');
      return;
    }
    if (currWord.length === 1) {
      resetState();
      setInfoMessage('Word is too short!');
      return;
    }
    // TODO currWord проверка в словаре
    if (selectedCell !== null) {
      if (!idsOfChosenLetters.includes(selectedCell)) {
        resetState();
        setInfoMessage('Word must contain selected cell!');
        return;
      }
      setInfoMessage(`Accepted: ${currWord}`);
    }
    // Важно! не очищаем выбранную букву, т.к. она была принята
    resetState(true);
  };

  const handleCurrentLetter = (letter: string) => {
    if (focusedCell) {
      setSelectedCell(focusedCell);
      setIsKeyboardHidden(true);
      setEnteredLetter(letter);
      setLetterInCells(letter, focusedCell);
    }
  };

  const handleKeyPressLetter = () => {
    if (focusedCell == null || cells[focusedCell] !== '' || enteredLetter) {
      return;
    }
    const currLetters = getLangLetters(lang);
    const letters = currLetters.flat().map((el) => el.name.toUpperCase());
    if (letters.includes(symbolPressed.toUpperCase())) {
      handleCurrentLetter(symbolPressed.toUpperCase());
    }
  };

  const handleMouseSelectCell = (index: number) => {
    if (!enteredLetter) {
      setFocusedCell(index);
      if (isKeyboardHidden) setIsKeyboardHidden(false);
    } else {
      setIsKeyboardHidden(true);
    }
  };

  const handleHideKeyboard = () => setIsKeyboardHidden(true);

  useEffect(() => {
    if (downPress || upPress || leftPress || rightPress) {
      setFocusedCell((prevState: number | null) => {
        if (prevState === null) {
          return 0;
        }

        const moveDownIsPossible = prevState + fieldSize < cells.length;
        const moveUpIsPossible = prevState - fieldSize >= 0;
        const moveLeftIsPossible = prevState - 1 >= 0;
        const moveRightIsPossible = prevState + 1 < cells.length;

        if (downPress && moveDownIsPossible) {
          return prevState + fieldSize;
        }

        if (upPress && moveUpIsPossible) {
          return prevState - fieldSize;
        }

        if (leftPress && moveLeftIsPossible) {
          return prevState - 1;
        }
        if (rightPress && moveRightIsPossible) {
          return prevState + 1;
        }
        return prevState;
      });
    }
  }, [downPress, upPress, leftPress, rightPress]);

  useEffect(() => {
    if (escPress) resetState();
    const isSelectedCellWithoutLetter = !enteredLetter && focusedCell != null;
    if (shiftPress && isSelectedCellWithoutLetter) {
      setIsKeyboardHidden(!isKeyboardHidden);
    }
    if (enterPress) {
      handleSubmitButton();
    }
  }, [escPress, enterPress, shiftPress]);

  useEffect(() => {
    handleKeyPressLetter();
  }, [symbolPressed]);

  return (
    <div className="main-game">
      <div />
      <div className="field-area" role="button" tabIndex={0}>
        <Keyboard
          setCurrentLetter={handleCurrentLetter}
          isKeyboardHidden={isKeyboardHidden}
          handleHideKeyboard={handleHideKeyboard}
        />
        <div className="game-main">
          <Scores />
          <Field
            handleMouseSelectCell={handleMouseSelectCell}
            selectedCell={selectedCell}
            focusedCell={focusedCell}
            setCurrWord={setCurrWord}
            idsOfChosenLetters={idsOfChosenLetters}
            setIdsOfChosenLetters={setIdsOfChosenLetters}
            canSelect={enteredLetter !== ''}
            cells={cells}
          />
          <WordField currWord={currWord} infoMessage={infoMessage} />
          <div className="buttons">
            <Button disabled={!isKeyboardHidden} onClick={handleClearButton}>
              {t('buttons.cancel')}
            </Button>
            <Button disabled={!isKeyboardHidden}>Skip turn</Button>
            <Button disabled={!isKeyboardHidden} onClick={handleSubmitButton}>
              {t('buttons.submit')}
            </Button>
          </div>
        </div>
      </div>
      <div />
    </div>
  );
};
