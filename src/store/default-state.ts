import {
  DEFAULT_FIELD_SIZE,
  DEFAULT_GAMER_NAME,
  DEFAULT_LANG,
  DEFAULT_SECOND_GAMER_NAME,
} from '@constants';
import { IAppState } from '@types';

export const defaultState: IAppState = {
  currentGame: {
    isOnline: false,
    fieldSize: DEFAULT_FIELD_SIZE,
    time: null,
    isBotEnemy: false,
    firstWord: null,
    currentWord: null,
    isGamerTurn: true,
    words: {
      gamer: [],
      enemy: [],
    },
    points: {
      gamer: 0,
      enemy: 0,
    },
  },

  settings: {
    lang: DEFAULT_LANG,
    isSoundOn: true,
    gamerName: DEFAULT_GAMER_NAME,
    secondGamerName: DEFAULT_SECOND_GAMER_NAME,
    currentTheme: null,
  },

  rating: {
    field: DEFAULT_FIELD_SIZE,
    withOnline: false,
    withBot: false,
    top: [],
  },
};
