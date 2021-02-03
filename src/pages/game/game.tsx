import React, { useState, useEffect, useRef } from 'react';
import './game.scss';
import { Keyboard, Field, WordField, Scores, PlayerWords, GameOverModal, AnimatedText, Sound } from '@components';
import Button from 'react-bootstrap/Button';
import {
  getLangLetters,
  Languages,
  Api,
  NOTIFY_COLORS,
  PLAYERS_ID,
  MAX_DESCRIPTION_LENGTH,
  MAX_PENALTY,
  MIN_DESCRIPTION,
} from '@constants';
import { useSelector, useDispatch } from 'react-redux';
import { useKeyPress, useSymbolKeyPress, useApi, useAuth } from '@hooks';
import { useTranslation } from 'react-i18next';
import { initCells } from '@utils';
import { IAppState, IGameState, IWordState } from '@types';
import { setGame, nextTurn, setModal, stopGame, startGame, setWinner, setPenaltyPoints } from '@store';

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
  const [isShowAnimation, setIsShowAnimation] = useState(false);
  const [animatedText, setAnimatedText] = useState('');
  const [animatedTextColor, setAnimatedTextColor] = useState('');
  const [isPlay, setIsPlay] = useState<boolean>(false);

  const fieldSize = useSelector((state: IAppState) => state.game.fieldSize);
  const firstWord = useSelector((state: IAppState) => state.game.firstWord);
  const isBotGame = useSelector((state: IAppState) => state.game.isBot);
  const [cells, setCells] = useState(initCells(fieldSize, firstWord));
  const { t } = useTranslation();
  const [infoMessage, setInfoMessage] = useState('');
  const [timerKey, setTimerKey] = useState(0);
  const modal = useSelector((state: IAppState) => state.modal);

  const dispatch = useDispatch();
  const game = useSelector((state: IAppState) => state.game);
  const setGameSettings = (settings: IGameState) => dispatch(setGame(settings));
  const playerTurnId = useSelector((state: IAppState) => state.game.playerTurnId);
  const firstGamerName = useSelector((state: IAppState) => state.settings.gamerNames[PLAYERS_ID.FIRST_GAMER_ID]);
  const secondGamerName = useSelector((state: IAppState) => state.settings.gamerNames[PLAYERS_ID.SECOND_GAMER_ID]);
  const curGamerName = useSelector((state: IAppState) => state.settings.gamerNames[game.playerTurnId]);
  const isGameEnded = useSelector((state: IAppState) => state.game.winnerId !== null);

  const [isFreezed, setIsFreezed] = useState(false);

  let firstPlayerPoints = game.player1.points;
  let secondPlayerPoints = game.player2.points;

  const winnerName = useSelector((state: IAppState) => {
    if (game.winnerId !== null) {
      return state.settings.gamerNames[game.winnerId];
    }
    return '';
  });
  const isSoundMuteOn = useSelector((state: IAppState) => state.settings.isSoundOn);

  const { request } = useApi();
  const { url, method } = Api.GET_WORD_INFO;

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

  const lang = useSelector((state: IAppState) => state.settings.lang);
  const [language] = Object.keys(Languages).filter((key) => Languages[key as keyof typeof Languages] === lang);

  const isSecondPlayerTurn = playerTurnId === PLAYERS_ID.SECOND_GAMER_ID;
  const isFirstPlayerTurn = playerTurnId === PLAYERS_ID.FIRST_GAMER_ID;

  const setLetterInCells = (letter: string, pos: number) => {
    const newCells = [...cells];
    newCells[pos] = letter;
    setCells(newCells);
    return newCells;
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

  const setGameWinner = (winnerId: number) => {
    const duration = new Date().getTime() - startTime.getTime();
    dispatch(setWinner({ duration, winnerId }));
  };

  const handleClearButton = () => resetState(false);
  const setNextTurn = () => {
    resetState();
    resetTimer();
    const isPlayer2MaxPenalties = game.player2.penalties + 1 > MAX_PENALTY;
    const isPlayer1MaxPenalties = game.player1.penalties + 1 > MAX_PENALTY;

    if (isSecondPlayerTurn && isPlayer2MaxPenalties) {
      setGameWinner(PLAYERS_ID.FIRST_GAMER_ID);
    } else if (isFirstPlayerTurn && isPlayer1MaxPenalties) {
      setGameWinner(PLAYERS_ID.SECOND_GAMER_ID);
    } else {
      dispatch(setPenaltyPoints());
      dispatch(nextTurn());
    }
  };

  const checkLastTurn = (arr: Array<string>) => {
    if (arr.every((el) => el !== '')) {
      if (firstPlayerPoints > secondPlayerPoints) {
        setGameWinner(PLAYERS_ID.FIRST_GAMER_ID);
      } else {
        setGameWinner(PLAYERS_ID.SECOND_GAMER_ID);
      }
    }
  };

  const updatePoints = (winWord: string, description: string) => {
    const numberOfPoints = winWord.length;
    let descriptionShort = description.split(MAX_DESCRIPTION_LENGTH)[0];

    if (descriptionShort.length < MIN_DESCRIPTION) {
      const textNoDesc = t('game.noDesc');
      descriptionShort = textNoDesc;
    }

    if (isFirstPlayerTurn) {
      firstPlayerPoints += numberOfPoints;
      setGameSettings({
        ...game,
        ...game.player2,
        player1: {
          ...game.player1,
          points: firstPlayerPoints,
          playerWords: [...game.player1.playerWords, { word: winWord.toUpperCase(), description: descriptionShort }],
        },
      });
    } else {
      secondPlayerPoints += numberOfPoints;
      setGameSettings({
        ...game,
        player2: {
          ...game.player2,
          points: secondPlayerPoints,
          playerWords: [...game.player2.playerWords, { word: winWord.toUpperCase(), description: descriptionShort }],
        },
      });
    }

    if (!isGameEnded) dispatch(nextTurn());
  };

  const showAnimationMsg = (textMsg: string, color: string) => {
    setAnimatedTextColor(color);
    setAnimatedText(textMsg);
    setIsShowAnimation(true);
  };

  const checkInDictionary = async (word: string) => {
    try {
      const wordInfo = await request(url(language || lang, word.toLowerCase()), method);
      setInfoMessage(t('game.acceptedFrom', { curGamerName, currWord }));
      updatePoints(currWord, wordInfo.definition);
      resetTimer();
      resetState(true);
      showAnimationMsg(t('game.points', { points: currWord.length }), NOTIFY_COLORS.info);
      checkLastTurn(cells);
    } catch (e) {
      showAnimationMsg(t('game.tryAgain'), NOTIFY_COLORS.error);
      resetState();
      setInfoMessage(t('game.notInDictionary', { currWord }));
    }
  };

  const checkUsedWord = (wordObj: Array<IWordState>, wordToCheck: string) =>
    wordObj.filter((el) => el.word === wordToCheck).length !== 0;

  const checkFirstWord = (wordToCheck: string) => firstWord === wordToCheck.toLowerCase();

  const validateSubmit = (): [string, boolean] | null => {
    if (currWord.length === 0) return [t('game.notChoose'), false];
    if (currWord.length === 1) return [t('game.tooShort'), true];
    if (selectedCell !== null && !idsOfChosenLetters.includes(selectedCell)) {
      return [t('game.mustContain'), true];
    }

    if (checkUsedWord(game.player1.playerWords, currWord)) {
      return [t('game.usedWordFirst', { firstGamerName }), true];
    }
    if (checkUsedWord(game.player2.playerWords, currWord)) {
      return [t('game.usedWordSecond', { secondGamerName }), true];
    }
    if (checkFirstWord(currWord)) {
      return [t('game.usedFirstWord'), true];
    }

    return null;
  };

  const handleSubmitButton = () => {
    const validationError = validateSubmit();
    if (validationError != null) {
      const [msg, shouldReset] = validationError;
      if (shouldReset) {
        resetState();
      }
      showAnimationMsg(t('game.tryAgain'), NOTIFY_COLORS.error);
      setInfoMessage(msg);
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
    if (isGameEnded || isFreezed) return;
    if (!enteredLetter) {
      setFocusedCell(index);
      if (isKeyboardHidden) setIsKeyboardHidden(false);
    } else {
      setIsKeyboardHidden(true);
    }
  };

  const handlePlay = () => setIsPlay(true);

  const handleHideKeyboard = () => setIsKeyboardHidden(true);
  const disableButtons = !isKeyboardHidden || isGameEnded || isFreezed;

  const setBotWord = async () => {
    try {
      const { url: urlBot, method: methodBot, body } = Api.BOT;
      setIsFreezed(true);
      const used = game.player1.playerWords.concat(game.player2.playerWords).map((el) => el.word);
      const data = await request(urlBot(language || lang), methodBot, body(cells, [...used, firstWord]));
      const newCells = setLetterInCells(data.character.toUpperCase(), Number(data.index));
      resetTimer();
      showAnimationMsg(t('game.points', { points: data.word.length }), NOTIFY_COLORS.info);
      updatePoints(data.word, data.definition);
      checkLastTurn(newCells);
    } catch (e) {
      setNextTurn();
    }
  };

  useEffect(() => {
    if (isBotGame && isSecondPlayerTurn) {
      if (isGameEnded || isFreezed) return;
      setBotWord();
    } else {
      setIsFreezed(false);
    }
  }, [game.playerTurnId]);

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
    if (isGameEnded || isFreezed) return;
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
    if (isGameEnded || isFreezed) return;
    handleKeyPressLetter();
  }, [symbolPressed]);

  useEffect(() => {
    if (isGameEnded) {
      if (isBotGame) {
        if (game.winnerId === PLAYERS_ID.SECOND_GAMER_ID) {
          dispatch(setModal({ isWin: false, contentText: t('game.youLose') }));
        } else {
          dispatch(setModal({ isWin: true, contentText: t('game.youWon') }));
        }
      } else {
        dispatch(setModal({ isWin: true, contentText: t('game.nameWon', { winnerName }) }));
      }
    }
  }, [game.winnerId]);

  const setGameIsStart = React.useCallback(() => dispatch(startGame()), [dispatch]);
  const setGameIsStop = React.useCallback(() => dispatch(stopGame()), [dispatch]);

  useEffect(() => {
    setGameIsStart();
    setInfoMessage(t('game.enterLetter'));
    showAnimationMsg(t('game.gameStarted'), NOTIFY_COLORS.info);
    return () => {
      setGameIsStop();
    };
  }, []);

  const finishGame = async (id: string, isBot: boolean, size: number, score: number, time: number, isWin: boolean) => {
    const { url: gUrl, method: gMethod, body: gBody } = Api.SET_GAME;
    try {
      await request(gUrl, gMethod, gBody(id, isBot, size, score, time, isWin));
    } catch (e) {
      showAnimationMsg(e.message, NOTIFY_COLORS.error);
    }
  };

  const { userId } = useAuth();

  useEffect(() => {
    if (isGameEnded) {
      const duration = new Date().getTime() - startTime.getTime();
      let isWin = false;
      if (game.winnerId === 0) {
        isWin = true;
      }
      if (userId) {
        finishGame(userId, isBotGame, fieldSize, game.player1.points, duration, isWin);
      }
    }
  }, [isGameEnded, userId]);

  return (
    <div className="main-game">
      <Scores onTimerComplete={setNextTurn} timerKey={timerKey} />
      <div className="game">
        <PlayerWords playerId={PLAYERS_ID.FIRST_GAMER_ID} />
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
              <Button
                disabled={disableButtons}
                onClick={() => {
                  handleClearButton();
                  handlePlay();
                }}
                variant="success"
              >
                {t('buttons.cancel')}
              </Button>
              <Button
                disabled={disableButtons}
                onClick={() => {
                  setNextTurn();
                  handlePlay();
                }}
                variant="danger"
              >
                {t('buttons.skip')}
              </Button>
              <Button
                disabled={disableButtons}
                onClick={() => {
                  handleSubmitButton();
                  handlePlay();
                }}
                variant="success"
              >
                {t('buttons.submit')}
              </Button>
            </div>
          </div>
        </div>
        <PlayerWords playerId={PLAYERS_ID.SECOND_GAMER_ID} />
        <Sound playing={isPlay} format={['mp3']} loop={false} mute={!isSoundMuteOn} onEnd={setIsPlay} />
        <AnimatedText
          isShow={isShowAnimation}
          setIsShowAnimation={setIsShowAnimation}
          text={animatedText}
          colorMsg={animatedTextColor}
        />
      </div>
      {modal ? <GameOverModal modal={modal} /> : null}
    </div>
  );
};
