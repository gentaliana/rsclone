import React, { useState, useEffect, useRef } from 'react';
import './game.scss';
import { Keyboard, Field, WordField, Scores, PlayerWords, GameOverModal } from '@components';
import Button from 'react-bootstrap/Button';
import { getLangLetters, Languages, Api, NOTIFY_TYPES } from '@constants';
import { useSelector, useDispatch } from 'react-redux';
import { useKeyPress, useSymbolKeyPress, useApi } from '@hooks';
import { useTranslation } from 'react-i18next';
import { initCells } from '@utils';
import { IAppState, IGameState } from '@types';
import { setGame, nextTurn, setModal, stopGame, startGame, setNotify } from '@store';
import ReactHowler from 'react-howler';

export const Game = (): JSX.Element => {
  const [enteredLetter, setEnteredLetter] = useState('');
  const [isKeyboardHidden, setIsKeyboardHidden] = useState(true);
  // current focused cell by keyboard / mouse
  const [focusedCell, setFocusedCell] = useState<number | null>(null);
  // a cell with selected new letter
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [currWord, setCurrWord] = useState<string>('');
  const [idsOfChosenLetters, setIdsOfChosenLetters] = useState<Array<number>>([]);
  const [startTime] = useState<Date>(new Date());

  const fieldSize = useSelector((state: IAppState) => state.game.fieldSize);
  const firstWord = useSelector((state: IAppState) => state.game.firstWord);
  const [cells, setCells] = useState(initCells(fieldSize, firstWord));
  const [infoMessage, setInfoMessage] = useState('Please, enter the letter');
  const [timerKey, setTimerKey] = useState(0);
  const modal = useSelector((state: IAppState) => state.modal);

  const dispatch = useDispatch();
  const game = useSelector((state: IAppState) => state.game);
  const setGameSettings = (settings: IGameState) => dispatch(setGame(settings));
  const isPlayer1Turn = useSelector((state: IAppState) => state.game.isPlayer1Turn);
  const firstGamerName = useSelector((state: IAppState) => state.settings.gamerName);
  const secondGamerName = useSelector((state: IAppState) => state.settings.secondGamerName);
  const curGamerName = game.isPlayer1Turn ? firstGamerName : secondGamerName;

  const { request } = useApi();
  const { url, method } = Api.GET_WORD_INFO;

  const isMusicOn = useSelector((state: IAppState) => state.settings.isSoundOn);

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
  const [language] = Object.keys(Languages).filter((key) => Languages[key as keyof typeof Languages] === lang);

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

  const setWinner = (winnerName: string) => {
    const gameDuration = new Date().getTime() - startTime.getTime();
    setGameSettings({ ...game, duration: gameDuration, isWin: winnerName });
  };

  const updatePoints = (winWord: string) => {
    const numberOfPoints = winWord.length;

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

    if (cells.filter((el) => el === '').length === 0) {
      if (currFirstPlayerPoints > currSecondPlayerPoints) {
        setWinner(firstGamerName);
      } else {
        setWinner(secondGamerName);
      }
    }
  };

  const openModal = React.useCallback(
    (headerText: string, contentText: string, variant: string = NOTIFY_TYPES.success) => {
      dispatch(setNotify({ headerText, contentText, variant }));
    },
    [dispatch],
  );

  const checkInDictionary = async (word: string) => {
    try {
      // TODO сохранять ответ для тултипа
      await request(url(language || lang, word.toLowerCase()), method);
      setInfoMessage(`Accepted from ${curGamerName}: ${currWord}`);
      updatePoints(currWord);
      resetTimer();
      resetState(true);
    } catch (e) {
      await openModal('dictionary error', e.message, NOTIFY_TYPES.error);
      resetState();
      setInfoMessage(`${currWord} not found in dictionary!`);
    }
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
    checkInDictionary(currWord);
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
    if (game.isWin) return;
    if (!enteredLetter) {
      setFocusedCell(index);
      if (isKeyboardHidden) setIsKeyboardHidden(false);
    } else {
      setIsKeyboardHidden(true);
    }
  };

  const handleHideKeyboard = () => setIsKeyboardHidden(true);
  const disableButtons = !isKeyboardHidden || Boolean(game.isWin);

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
    if (game.isWin) return;
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
    if (game.isWin) return;
    handleKeyPressLetter();
  }, [symbolPressed]);

  useEffect(() => {
    if (game.player2.penalties > 2) {
      setWinner(firstGamerName);
    } else if (game.player1.penalties > 2) {
      setWinner(secondGamerName);
    }
  }, [game.player1.penalties, game.player2.penalties]);

  useEffect(() => {
    if (game.isOnline) {
      if (game.isWin === 'bot') {
        dispatch(setModal({ isWin: false, contentText: 'You lose' }));
      } else {
        dispatch(setModal({ isWin: true, contentText: 'You won' }));
      }
    } else if (game.isWin) {
      dispatch(setModal({ isWin: true, contentText: `${game.isWin} won` }));
    }
  }, [game.isWin]);

  const setGameIsStart = React.useCallback(() => dispatch(startGame()), [dispatch]);
  const setGameIsStop = React.useCallback(() => dispatch(stopGame()), [dispatch]);

  useEffect(() => {
    setGameIsStart();

    return () => {
      setGameIsStop();
    };
  }, []);

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
            <ReactHowler src="https://noisefx.ru/noise_base/obect/ofis/00171.mp3" playing={isMusicOn} volume={1} />
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
              <Button disabled={disableButtons} onClick={handleClearButton}>
                {t('buttons.cancel')}
              </Button>
              <Button disabled={disableButtons} onClick={setNextTurn}>
                {t('buttons.skip')}
              </Button>
              <Button disabled={disableButtons} onClick={handleSubmitButton}>
                {t('buttons.submit')}
              </Button>
            </div>
          </div>
        </div>
        <PlayerWords isEnemy />
      </div>
      {modal ? <GameOverModal modal={modal} /> : null}
    </div>
  );
};
