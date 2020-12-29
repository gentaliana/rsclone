export interface IAppState {
  currentGame: {
    isOnline: boolean;
    fieldSize: number;
    time: number | null;
    isBotEnemy: boolean;
    firstWord: string | null;
    currentWord: string | null;
    isGamerTurn: boolean;
    words: {
      gamer: string[];
      enemy: string[];
    };
    points: {
      gamer: number;
      enemy: number;
    };
  };

  settings: {
    lang: string;
    isSoundOn: boolean;
    gamerName: string;
    secondGamerName: string;
    currentTheme: string | null;
  };

  rating: {
    field: number;
    withOnline: boolean;
    withBot: boolean;
    top: IRatingItem[];
  };
}

export interface IRatingItem {
  position: number;
  name: string;
  points: number;
  word: string;
  date: Date;
}
