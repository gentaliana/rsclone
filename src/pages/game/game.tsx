import React, { useState, useEffect } from 'react';
import './game.scss';
import { Keyboard, Field, WordField } from '@components';
import Button from 'react-bootstrap/Button';
import { getLangLetters } from '@constants';
import { useSelector } from 'react-redux';
import { IAppState, ICell } from '@types';
import { useKeyPress } from '@hooks';
import { useTranslation } from 'react-i18next';

export const Game = (): JSX.Element => {
  const [enteredLetter, setEnteredLetter] = useState('');
  const [isKeyboardHidden, setIsKeyboardHidden] = useState(true);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [currWord, setCurrWord] = useState<string>('');
  const [idsOfChosenLetters, setIdsOfChosenLetters] = useState<Array<number>>([]);
  // TODO брать из redux после начальных настроек
  const fieldSize = 5;

  const escPress = useKeyPress('Escape');
  const spacePress = useKeyPress(' ');
  const downPress = useKeyPress('ArrowDown');
  const upPress = useKeyPress('ArrowUp');
  const leftPress = useKeyPress('ArrowLeft');
  const rightPress = useKeyPress('ArrowRight');

  const { t } = useTranslation();

  const createInitialArray = () => {
    const generatedArray = new Array(fieldSize * fieldSize).fill({ currLetter: null });
    const initialWord = 'БАЛДА';
    let i = 0;
    const start = Math.floor(fieldSize / 2) * fieldSize - 1;
    const end = start + fieldSize + 1;
    return generatedArray.map((el: ICell, idx: number) => {
      if (idx > start && idx < end) {
        const letter = initialWord[i];
        i++;
        return { ...el, currLetter: letter };
      }
      return { ...el };
    });
  };
  const [cells, setCells] = useState(createInitialArray());

  const handleClearButton = () => {
    setEnteredLetter('');
    setSelectedCell(null);
    setIsKeyboardHidden(true);
    setIdsOfChosenLetters([]);
    setCurrWord('');
  };

  const handleSubmitButton = () => {
    // TODO currWord проверка в словаре
    const updatedCells = [...cells];
    if (selectedCell !== null) {
      updatedCells[selectedCell].currLetter = enteredLetter;
    }
    setCells(updatedCells);
    handleClearButton();
  };

  const handleCurrentLetter = (letter: string) => {
    setIsKeyboardHidden(true);
    setEnteredLetter(letter);
  };

  useEffect(() => {
    if (downPress || upPress || leftPress || rightPress) {
      setSelectedCell((prevState: number | null) => {
        if (enteredLetter) {
          return prevState;
        }
        if (prevState === null) {
          return 0;
        }

        const moveDownIsPossible = prevState + fieldSize < cells.length;
        const moveUpIsPossible = prevState - fieldSize >= 0;
        const moveLeftIsPossible = prevState - 1 >= 0;
        const moveRightIsPossible = prevState + 1 < cells.length;

        if (downPress && moveDownIsPossible) {
          console.log(prevState + fieldSize);
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
    if (escPress) handleClearButton();
    const isSelectedCellWithoutLetter = !enteredLetter && selectedCell != null;
    if (spacePress && isSelectedCellWithoutLetter) {
      setIsKeyboardHidden(!isKeyboardHidden);
    }
  }, [escPress, spacePress]);

  const lang = useSelector((state: IAppState) => state.settings.lang);

  const handleKeyPressLetter = (event: KeyboardEvent) => {
    console.log(selectedCell);
    if (selectedCell != null) console.log(cells[selectedCell].currLetter);
    if (selectedCell != null && cells[selectedCell].currLetter) {
      return;
    }
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
    <>
      <div />
      <div className="field-area" role="button" tabIndex={0}>
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
          setCurrWord={setCurrWord}
          idsOfChosenLetters={idsOfChosenLetters}
          setIdsOfChosenLetters={setIdsOfChosenLetters}
          cells={cells}
        />
        <WordField currWord={currWord} />
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
      <div />
    </>
  );
};
