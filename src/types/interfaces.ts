import { Languages } from '@constants';

export interface IAppState {
  notify: INotify | null;
  modal: IModal | null;
  universalModal: IUniversalModal | null;
  game: IGameState;

  settings: ISettingsState;

  rating: {
    field: number;
    withOnline: boolean;
    withBot: boolean;
    top: IRatingItem[];
  };
}

export interface ISettingsState {
  lang: Languages;
  isSoundOn: boolean;
  isMusicOn: boolean;
  gamerNames: Array<string>;
  currentTheme: string;
}

export interface IGameState {
  isOnline: boolean;
  fieldSize: number;
  time: number;
  isBot: boolean;
  firstWord: string;
  currentWord: string;
  playerTurnId: number;
  isGameStart: boolean;
  winnerId: number | null;
  duration: number;
  player1: IPlayerState;
  player2: IPlayerState;
}

export interface IPlayerState {
  points: number;
  playerWords: IWordState[];
  penalties: number;
}

export interface IWordState {
  word: string;
  description: string;
}

export interface IRatingItem {
  position: number;
  name: string;
  points: number;
  word: string;
  date: Date;
}

export interface INotify {
  headerText: string;
  contentText: string;
  variant?: string;
}

export interface IModal {
  isWin: boolean;
  contentText: string;
}

export interface IUniversalModal {
  title: string;
  context: string;
  btnText: string;
}

export interface IWinnerState {
  duration: number;
  winnerId: number;
}
