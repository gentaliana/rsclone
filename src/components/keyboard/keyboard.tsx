import React, { useState } from 'react';
import './keyboard.scss';
import { Sound } from '@components';
import { getLangLetters, Languages, DEFAULT_LANG_GAME } from '@constants';
import { IKeyboardLang, IAppState } from '@types';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

type KeyboardProps = {
  setCurrentLetter: (letter: string) => void;
  handleHideKeyboard: () => void;
  isKeyboardHidden: boolean;
};

export const Keyboard = ({ setCurrentLetter, isKeyboardHidden, handleHideKeyboard }: KeyboardProps): JSX.Element => {
  const { lang } = JSON.parse(localStorage.getItem('settings') || DEFAULT_LANG_GAME);
  const langEnum = Languages[lang as keyof typeof Languages];
  const isSoundMuteOn = useSelector((state: IAppState) => state.settings.isSoundOn);
  const currLetters = getLangLetters(langEnum);

  const { t } = useTranslation();

  const [isPlay, setIsPlay] = useState<boolean>(false);

  const handlePlay = () => setIsPlay(true);

  const handleClick = (event: React.MouseEvent) => {
    setCurrentLetter((event.target as HTMLTextAreaElement).value);
  };

  const renderLettersRow = (row: Array<IKeyboardLang>) =>
    /* eslint-disable implicit-arrow-linebreak */
    row.map((letter) => (
      <button
        type="button"
        key={letter.name}
        className="keyboard__key"
        value={letter.name}
        onClick={(e) => {
          handleClick(e);
          handlePlay();
        }}
      >
        {letter.name}
      </button>
    ));

  const renderLetters = () =>
    currLetters.map((row: Array<IKeyboardLang>, i: number) => (
      /* eslint-disable  react/no-array-index-key */
      <div key={`row-${i}`} className="keyboard__row">
        {renderLettersRow(row)}
      </div>
    ));

  return (
    <div className={isKeyboardHidden ? 'keyboard keyboard-hidden' : 'keyboard'}>
      {renderLetters()}
      <Button
        className="mt-2"
        onClick={() => {
          handleHideKeyboard();
          handlePlay();
        }}
      >
        {t('buttons.close')}
      </Button>
      <Sound playing={isPlay} format={['mp3']} loop={false} mute={!isSoundMuteOn} onEnd={setIsPlay} />
    </div>
  );
};
