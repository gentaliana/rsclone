import React, { useState, useEffect } from 'react';
import './game.scss';
import { Keyboard, Field, WordField, Scores, PlayerWords } from '@components';
import Button from 'react-bootstrap/Button';
import { getLangLetters } from '@constants';
import { useSelector, useDispatch } from 'react-redux';
import { useKeyPress, useSymbolKeyPress } from '@hooks';
import { useTranslation } from 'react-i18next';
import { initCells } from '@utils';
import { IAppState, IGameState } from '@types';
import { setGame } from '@store';

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

  const dispatch = useDispatch();
  const game = useSelector((state: IAppState) => state.game);
  const setGameSettings = (settings: IGameState) => dispatch(setGame(settings));
  const isPlayer1Turn = useSelector((state: IAppState) => state.game.isPlayer1Turn);

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
    if (!skipLetterClean && enteredLetter && selectedCell !== null) {
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

    if (selectedCell !== null) {
      if (!idsOfChosenLetters.includes(selectedCell)) {
        resetState();
        setInfoMessage('Word must contain selected cell!');
        return;
      }
    }

    if (game.player1.words.includes(currWord) || game.player2.words.includes(currWord)) {
      resetState();
      setInfoMessage('This word was already used in game!');
      return;
    }
    // TODO currWord проверка в словаре
    setInfoMessage(`Accepted: ${currWord}`);

    const numberOfPoints = currWord.length;

    if (isPlayer1Turn) {
      setGameSettings({
        ...game,
        isPlayer1Turn: !game.isPlayer1Turn,
        player1: { points: game.player1.points + numberOfPoints, words: [...game.player1.words, currWord] },
      });
    } else {
      setGameSettings({
        ...game,
        isPlayer1Turn: !game.isPlayer1Turn,
        player2: { points: game.player2.points + numberOfPoints, words: [...game.player2.words, currWord] },
      });
    }

    // Важно! не очищаем выбранную букву, т.к. она была принята
    resetState(true);
  };

  const handleCurrentLetter = (letter: string) => {
    if (focusedCell !== null) {
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
    const isSelectedCellWithoutLetter = !enteredLetter && focusedCell !== null;
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
      <PlayerWords />
      <div className="field-area">
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
      <PlayerWords isEnemy />
    </div>
  );
};
