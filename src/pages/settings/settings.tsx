import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, setSound, setMusic, setLanguage, setFirstGamer, setSecondGamer } from '@store';
import { Button } from 'react-bootstrap';
import { IAppState } from '@types';
import { useTranslation } from 'react-i18next';
import {
  DEFAULT_GAMER_NAME,
  DEFAULT_SECOND_GAMER_NAME,
  NOTIFY_TYPES,
  PLAYERS_ID,
  DEFAULT_LANG,
  Theme,
} from '@constants';
import { ButtonToggle } from '@components';
import { User } from './User/User';
import { setDefSettingsToStorage } from '../../utils/setDefSettingsToStorage';
import { setNameUserToStorage } from '../../utils/setNameUserToStorage';
import { setParamToStorage } from '../../utils/setParamToStorage';
import './settings.scss';

export const Settings = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const setFirst = (gamer: string) => dispatch(setFirstGamer(gamer));
  const setSecond = (gamer: string) => dispatch(setSecondGamer(gamer));
  const setIsLang = (lang: string) => dispatch(setLanguage(lang));
  const setIsSoundOn = (sound: boolean) => dispatch(setSound(sound));
  const setIsMusicOn = (music: boolean) => dispatch(setMusic(music));

  const firstUserInitial = useSelector((state: IAppState) => state.settings.gamerNames[PLAYERS_ID.FIRST_GAMER_ID]);
  const secondUserInitial = useSelector((state: IAppState) => state.settings.gamerNames[PLAYERS_ID.SECOND_GAMER_ID]);
  const langInitial = useSelector((state: IAppState) => state.settings.lang);
  const musicInitial = useSelector((state: IAppState) => state.settings.isMusicOn);
  const soundInitial = useSelector((state: IAppState) => state.settings.isSoundOn);
  const themeInitial = useSelector((state: IAppState) => state.settings.currentTheme);
  const [isFirstName, setFirstName] = useState<string>(firstUserInitial);
  const [isSecondName, setSecondName] = useState<string>(secondUserInitial);

  const onChangeTheme = useCallback(() => {
    if (themeInitial === Theme.light) {
      dispatch(setTheme(Theme.dark));
      setParamToStorage('currentTheme', Theme.dark);
    } else {
      dispatch(setTheme(Theme.light));
      setParamToStorage('currentTheme', Theme.light);
    }
  }, [themeInitial, dispatch]);

  const isLightTheme = useMemo(() => themeInitial === Theme.light, [themeInitial]);

  const isDefaultSettings =
    langInitial !== DEFAULT_LANG ||
    musicInitial !== true ||
    soundInitial !== true ||
    firstUserInitial !== DEFAULT_GAMER_NAME ||
    secondUserInitial !== DEFAULT_SECOND_GAMER_NAME ||
    themeInitial !== 'light';

  return (
    <div className="settings settings-light">
      <User
        id={PLAYERS_ID.FIRST_GAMER_ID}
        userName={firstUserInitial}
        setUserName={setFirst}
        localUserName={isFirstName}
        setLocalUserName={setFirstName}
        userText={t('settingPage.firstUser')}
        changeLocalStarageName={setNameUserToStorage}
      />
      <User
        id={PLAYERS_ID.SECOND_GAMER_ID}
        userName={secondUserInitial}
        setUserName={setSecond}
        localUserName={isSecondName}
        setLocalUserName={setSecondName}
        userText={t('settingPage.secondUser')}
        changeLocalStarageName={setNameUserToStorage}
      />

      <div className="theme">
        <div className="themeText">{t('settingPage.theme')}</div>
        <ButtonToggle
          param={isLightTheme}
          classBtn="theme-btn"
          variant={isLightTheme ? NOTIFY_TYPES.light : NOTIFY_TYPES.dark}
          first={t('settingPage.light')}
          second={t('settingPage.dark')}
          onClick={onChangeTheme}
        />
      </div>

      <div className="btn-save">
        <Button
          variant={NOTIFY_TYPES.error}
          size="sm"
          disabled={!isDefaultSettings}
          onClick={() => {
            if (isDefaultSettings) {
              setFirst(DEFAULT_GAMER_NAME);
              setSecond(DEFAULT_SECOND_GAMER_NAME);

              i18n.changeLanguage(DEFAULT_LANG);
              setIsLang('English');
              setIsSoundOn(true);
              setIsMusicOn(true);
              setFirstName(DEFAULT_GAMER_NAME);
              setSecondName(DEFAULT_SECOND_GAMER_NAME);
              dispatch(setTheme(Theme.light));

              setDefSettingsToStorage();
            }
          }}
        >
          {t('settingPage.unsave')}
        </Button>
      </div>
    </div>
  );
};
