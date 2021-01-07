import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage, setSettings } from '@store';
import { Button } from 'react-bootstrap';
import { ISettingsState } from '@types';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LANG, Languages } from 'src/constants/languages';
import { SelectOption } from 'src/components/selectOption';
import { ButtonToggle } from '@components';
import { User } from './User/User';
import './settings.scss';

export const Settings = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const setLang = (lang: string) => dispatch(setLanguage(lang));
  const setSett = (sett: ISettingsState) => dispatch(setSettings(sett));

  const [sound, setSound] = React.useState<boolean>(true);
  const [firstUser, setFirstUser] = React.useState<string>('');
  const [secondUser, setSecondUser] = React.useState<string>('');
  const [theme, setTheme] = React.useState<boolean>(true);
  const [newLang, setNewLang] = React.useState<string>(DEFAULT_LANG);

  const changeLanguage = (lng: string | null) => {
    setNewLang(lng ?? DEFAULT_LANG);
    setLang(lng ?? DEFAULT_LANG);
  };
  const DROPDOWN_TITLES = React.useMemo(
    () => ({
      translations: t('dropdown.titles.language'),
    }),
    [t],
  );
  return (
    <div className="settings">
      <div className="sound">
        <div className="soundText">{t('setting.sound')}</div>
        {/* { param, classBtn, variant, onClick, first, second } */}
        <ButtonToggle
          param={sound}
          classBtn="ound-btn"
          variant="secondary"
          first={t('setting.soundOn')}
          second={t('setting.soundOff')}
          onClick={setSound}
        />
      </div>

      <User userName={firstUser} setUserName={setFirstUser} userText={t('setting.firstUser')} />
      <User userName={secondUser} setUserName={setSecondUser} userText={t('setting.secondUser')} />

      <div className="theme">
        <div className="themeText">{t('setting.theme')}</div>
        <ButtonToggle
          param={theme}
          classBtn="theme-btn"
          variant={theme ? 'light' : 'dark'}
          first={t('setting.light')}
          second={t('setting.dark')}
          onClick={setTheme}
        />
      </div>

      <div className="lang">
        <div className="langText">{t('setting.language')}:</div>
        <SelectOption setCurrShowingData={changeLanguage} options={Languages} title={DROPDOWN_TITLES.translations} />
      </div>
      <div className="btn-save">
        <Button
          variant="success"
          size="sm"
          onClick={() =>
            setSett(
              {
                lang: newLang,
                isSoundOn: sound,
                gamerName: firstUser === '' ? 'User 1' : firstUser,
                secondGamerName: secondUser === '' ? 'User 2' : secondUser,
                currentTheme: theme ? t('setting.light') : t('setting.dark'),
              },
            )
          }
        >
          {t('setting.save')}
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() =>
            setSett(
              {
                lang: 'en',
                isSoundOn: true,
                gamerName: 'Gamer 1',
                secondGamerName: 'Gamer 2',
                currentTheme: 'light',
              },
            )
          }
        >
          {t('setting.unsave')}
        </Button>
      </div>
    </div>
  );
};
