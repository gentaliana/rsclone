import { Languages } from '@constants';
import { RU_LETTERS } from './ruLetters';
import { EN_LETTERS } from './enLetters';
import { BE_LETTERS } from './beLetters';

type KeyboardKey = {
  name: string;
};

export const getLangLetters = (language: string): KeyboardKey[][] => {
  switch (language) {
    case Languages.RU:
      return RU_LETTERS;

    case Languages.EN:
      return EN_LETTERS;

    case Languages.BE:
      return BE_LETTERS;

    default:
      return RU_LETTERS;
  }
};
