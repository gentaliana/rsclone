import React, { useState, useEffect, useRef } from 'react';
import './game.scss';
import { Keyboard, Field, WordField, Scores, PlayerWords } from '@components';
import Button from 'react-bootstrap/Button';
import { getLangLetters } from '@constants';
import { useSelector, useDispatch } from 'react-redux';
import { useKeyPress, useSymbolKeyPress } from '@hooks';
import { useTranslation } from 'react-i18next';
import { initCells } from '@utils';
import { IAppState, IGameState } from '@types';
import { setGame, nextTurn, setNotify } from '@store';

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
  const [timerKey, setTimerKey] = useState(0);

  const dispatch = useDispatch();
  const game = useSelector((state: IAppState) => state.game);
  const setGameSettings = (settings: IGameState) => dispatch(setGame(settings));
  const isPlayer1Turn = useSelector((state: IAppState) => state.game.isPlayer1Turn);
  const firstGamerName = useSelector((state: IAppState) => state.settings.gamerName);
  const secondGamerName = useSelector((state: IAppState) => state.settings.secondGamerName);

  const selectedCellRef = useRef<number | null>(null);
  selectedCellRef.current = selectedCell;

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

  const resetTimer = () => {
    setTimerKey((prevKey: number) => prevKey + 1);
  };

  const resetState = (skipLetterClean?: boolean | null) => {
    if (!skipLetterClean && selectedCellRef.current !== null) {
      setLetterInCells('', selectedCellRef.current);
    }
    setEnteredLetter('');
    setSelectedCell(null);
    setIsKeyboardHidden(true);
    setIdsOfChosenLetters([]);
    setCurrWord('');
  };

  const handleClearButton = () => resetState(false);
  const setNextTurn = () => {
    resetState();
    resetTimer();
    dispatch(nextTurn());
  };

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

    const curGamerName = game.isPlayer1Turn ? firstGamerName : secondGamerName;

    if (selectedCell !== null) {
      if (!idsOfChosenLetters.includes(selectedCell)) {
        resetState();
        setInfoMessage('Word must contain selected cell!');
        return;
      }
    }

    if (game.player1.words.includes(currWord)) {
      resetState();
      setInfoMessage(`${firstGamerName} has already used this word in game!`);
      return;
    }

    if (game.player2.words.includes(currWord)) {
      resetState();
      setInfoMessage(`${secondGamerName} has already used this word in game!`);
      return;
    }

    // TODO currWord проверка в словаре

    setInfoMessage(`Accepted from ${curGamerName}: ${currWord}`);
    resetTimer();

    const numberOfPoints = currWord.length;

    const prevFirstPlayerPoints = game.player1.points;
    const currFirstPlayerPoints = prevFirstPlayerPoints + numberOfPoints;
    const prevSecondPlayerPoints = game.player2.points;
    const currSecondPlayerPoints = prevSecondPlayerPoints + numberOfPoints;

    if (isPlayer1Turn) {
      setGameSettings({
        ...game,
        isPlayer1Turn: !game.isPlayer1Turn,
        ...game.player2,
        player1: {
          ...game.player1,
          points: currFirstPlayerPoints,
          words: [...game.player1.words, currWord],
        },
      });
    } else {
      setGameSettings({
        ...game,
        isPlayer1Turn: !game.isPlayer1Turn,
        player2: {
          ...game.player2,
          points: currSecondPlayerPoints,
          words: [...game.player2.words, currWord],
        },
      });
    }
    resetState(true);

    if (cells.filter((el) => el === '').length === 0) {
      if (currFirstPlayerPoints > currSecondPlayerPoints) {
        setGameSettings({ ...game, player2: { ...game.player2, isLose: true } });
      } else {
        setGameSettings({ ...game, player1: { ...game.player1, isLose: true } });
      }
    }
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

  useEffect(() => {
    if (game.isOnline) {
      if (game.player1.isLose) {
        dispatch(setNotify({ headerText: 'Game ended!', contentText: 'You lose' }));
      } else if (game.player2.isLose) {
        dispatch(setNotify({ headerText: 'Game ended!', contentText: 'You won' }));
      }
    } else if (game.player1.isLose) {
      dispatch(setNotify({ headerText: 'Game ended!', contentText: `${secondGamerName} won` }));
    } else if (game.player2.isLose) {
      dispatch(setNotify({ headerText: 'Game ended!', contentText: `${firstGamerName} won` }));
    }
  }, [game.player1.isLose, game.player2.isLose]);

  return (
    <div className="main-game">
      <Scores onTimerComplete={setNextTurn} timerKey={timerKey} />
      <div className="game">
        <PlayerWords />
        <div className="field-area">
          <Keyboard
            setCurrentLetter={handleCurrentLetter}
            isKeyboardHidden={isKeyboardHidden}
            handleHideKeyboard={handleHideKeyboard}
          />
          <div>
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
              <Button disabled={!isKeyboardHidden} onClick={setNextTurn}>
                {t('buttons.skip')}
              </Button>
              <Button disabled={!isKeyboardHidden} onClick={handleSubmitButton}>
                {t('buttons.submit')}
              </Button>
            </div>
          </div>
        </div>
        <PlayerWords isEnemy />
      </div>
    </div>
  );
};
