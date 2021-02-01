import { Languages } from '@constants';
import { RU_LETTERS } from './ruLetters';
import { EN_LETTERS } from './enLetters';
import { BE_LETTERS } from './beLetters';

type KeyboardKey = {
  name: string;
};

export const getLangLetters = (language: string): KeyboardKey[][] => {
  switch (language) {
    case Languages.ru:
      return RU_LETTERS;

    case Languages.en:
      return EN_LETTERS;

    case Languages.be:
      return BE_LETTERS;

    default:
      return EN_LETTERS;
  }
};
