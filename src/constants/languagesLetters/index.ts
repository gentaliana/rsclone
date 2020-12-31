import { Languages } from '@constants';
import { RU_LETTERS } from './ruLetters';
import { EN_LETTERS } from './enLetters';

export const getLangLetters = (language: string) => {
  switch (language) {
    case Languages.RU:
      return RU_LETTERS;

    case Languages.EN:
      return EN_LETTERS;

    default:
      return RU_LETTERS;
  }
};
