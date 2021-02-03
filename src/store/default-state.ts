import {
  DEFAULT_FIELD_SIZE,
  DEFAULT_GAMER_NAME,
  DEFAULT_LANG,
  DEFAULT_SECOND_GAMER_NAME,
  DEFAULT_THEME,
  PLAYERS_ID,
} from '@constants';
import { IAppState } from '@types';

export const defaultState: IAppState = {
  game: {
    isOnline: false,
    fieldSize: DEFAULT_FIELD_SIZE,
    time: 0,
    isBot: false,
    firstWord: '',
    currentWord: '',
    playerTurnId: PLAYERS_ID.FIRST_GAMER_ID,
    isGameStart: false,
    duration: 0,
    winnerId: null,
    player1: {
      points: 0,
      playerWords: [],
      penalties: 0,
    },
    player2: {
      points: 0,
      playerWords: [],
      penalties: 0,
    },
  },

  settings: {
    lang: JSON.parse(localStorage.getItem('settings') || '{}').lang || DEFAULT_LANG,
    isSoundOn:
      JSON.parse(localStorage.getItem('settings') || '{}').isSoundOn !== undefined
        ? JSON.parse(localStorage.getItem('settings') || '{}').isSoundOn
        : true,
    isMusicOn:
      JSON.parse(localStorage.getItem('settings') || '{}').isMusicOn !== undefined
        ? JSON.parse(localStorage.getItem('settings') || '{}').isMusicOn
        : true,
    gamerNames: JSON.parse(localStorage.getItem('settings') || '{}').gamerNames || [
      DEFAULT_GAMER_NAME,
      DEFAULT_SECOND_GAMER_NAME,
    ],
    currentTheme: JSON.parse(localStorage.getItem('settings') || '{}').currentTheme || DEFAULT_THEME,
  },

  rating: {
    field: DEFAULT_FIELD_SIZE,
    withOnline: false,
    withBot: false,
    top: [],
  },

  notify: null,

  modal: null,
  universalModal: null,
};
