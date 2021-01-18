import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSettings } from '@store';
import { Button } from 'react-bootstrap';
import { ISettingsPage, IAppState } from '@types';
import { useTranslation } from 'react-i18next';
import { DEFAULT_GAMER_NAME, DEFAULT_SECOND_GAMER_NAME, NOTIFY_TYPES, PLAYERS_ID } from '@constants';
// import { SelectOption } from 'src/components/selectOption';
import { ButtonToggle } from '@components';
import { User } from './User/User';
import './settings.scss';

export const Settings = (): JSX.Element => {
  // const DEFAULT_LANG = 'en';
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const setLang = (lang: string) => dispatch(setLanguage(lang));
  const setSett = (sett: ISettingsPage) => dispatch(setSettings(sett));

  // const soundInitial = useSelector((state: IAppState) => state.settings.isSoundOn);
  const firstUserInitial = useSelector((state: IAppState) => state.settings.gamerNames[PLAYERS_ID.FIRST_GAMER_ID]);
  const secondUserInitial = useSelector((state: IAppState) => state.settings.gamerNames[PLAYERS_ID.SECOND_GAMER_ID]);
  const themeInitial = useSelector((state: IAppState) => state.settings.currentTheme);
  // const langInitial = useSelector((state: IAppState) => state.settings.lang);

  // const [sound, setSound] = useState<boolean>(soundInitial);
  const [firstUser, setFirstUser] = useState<string>(firstUserInitial);
  const [secondUser, setSecondUser] = useState<string>(secondUserInitial);
  const [theme, setTheme] = useState<boolean>(themeInitial === 'light');
  // const [newLang, setNewLang] = useState<string>(langInitial);

  useEffect(() => {
    // setSound(soundInitial);
    setFirstUser(firstUserInitial);
    setSecondUser(secondUserInitial);
    setTheme(themeInitial === 'light');
    // setNewLang(langInitial);
  }, [
    // soundInitial,
    firstUserInitial,
    secondUserInitial,
    themeInitial,
    // langInitial,
  ]);

  // const changeLanguage = (lng: string | null) => {
  //   setNewLang(lng ?? DEFAULT_LANG);
  //   setLang(lng ?? DEFAULT_LANG);
  // };
  // const DROPDOWN_TITLES = React.useMemo(
  //   () => ({
  //     translations: t('dropdown.titles.language'),
  //   }),
  //   [t],
  // );
  return (
    <div className="settings">
      {/* <div className="sound">
        <div className="soundText">{t('settingPage.sound')}</div>
        <ButtonToggle
          param={sound}
          classBtn="sound-btn"
          variant={NOTIFY_TYPES.secondary}
          first={t('settingPage.soundOn')}
          second={t('settingPage.soundOff')}
          onClick={setSound}
        />
      </div> */}

      <User userName={firstUser} setUserName={setFirstUser} userText={t('settingPage.firstUser')} />
      <User userName={secondUser} setUserName={setSecondUser} userText={t('settingPage.secondUser')} />

      <div className="theme">
        <div className="themeText">{t('settingPage.theme')}</div>
        <ButtonToggle
          param={theme}
          classBtn="theme-btn"
          variant={theme ? NOTIFY_TYPES.light : NOTIFY_TYPES.dark}
          first={t('settingPage.light')}
          second={t('settingPage.dark')}
          onClick={setTheme}
        />
      </div>

      {/* <div className="lang">
        <div className="langText">{t('settingPage.language')}:</div>
      </div> */}
      <div className="btn-save">
        <Button
          variant={NOTIFY_TYPES.success}
          size="sm"
          onClick={() => {
            setSett({
              // lang: langInitial,
              // isSoundOn: soundInitial,
              gamerNames: [
                firstUser === '' ? DEFAULT_GAMER_NAME : firstUser,
                secondUser === '' ? DEFAULT_SECOND_GAMER_NAME : secondUser,
              ],
              currentTheme: theme ? t('settingPage.light') : t('settingPage.dark'),
            });
            // i18n.changeLanguage(newLang);
          }}
        >
          {t('settingPage.save')}
        </Button>
        <Button
          variant={NOTIFY_TYPES.error}
          size="sm"
          disabled={
            // newLang === DEFAULT_LANG &&
            // sound &&
            firstUser === DEFAULT_GAMER_NAME && secondUser === DEFAULT_SECOND_GAMER_NAME && theme
          }
          onClick={() => {
            if (firstUser !== DEFAULT_GAMER_NAME || secondUser !== DEFAULT_SECOND_GAMER_NAME || !theme) {
              // setSound(soundInitial);
              setFirstUser(firstUserInitial);
              setSecondUser(secondUserInitial);
              setTheme(themeInitial === 'light');
              // setNewLang(langInitial);
            }
            if (
              // soundInitial !== true ||
              firstUserInitial !== DEFAULT_GAMER_NAME ||
              secondUserInitial !== DEFAULT_SECOND_GAMER_NAME ||
              themeInitial !== 'light'
              // langInitial !== DEFAULT_LANG
            ) {
              setSett({
                // lang: langInitial,
                // isSoundOn: soundInitial,
                gamerNames: [DEFAULT_GAMER_NAME, DEFAULT_SECOND_GAMER_NAME],
                currentTheme: 'light',
              });
              // i18n.changeLanguage(DEFAULT_LANG);
            }
          }}
        >
          {t('settingPage.unsave')}
        </Button>
      </div>
    </div>
  );
};
