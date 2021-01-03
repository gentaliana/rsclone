import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage, setSettings } from '@store';
import { ToggleButton, ButtonGroup, Button } from 'react-bootstrap';
import { ISettingsState } from '@types';
import { User } from './User/User';

import './settings.scss';

type IButtonGroupSound = {
  name: string;
  value: boolean;
  id: number;
};

type IButtonGroupTheme = {
  name: string;
  value: string;
  var: string;
  id: number;
};
type IButtonGroupLang = {
  name: string;
  value: string;
  id: number;
};

export const Settings = (): JSX.Element => {
  const soundInitial = [
    { name: 'Musik on', value: true, id: 1 },
    { name: 'Musik off', value: false, id: 2 },
  ];
  const themeInitial = [
    { name: 'light theme', value: 'light', var: 'light', id: 1 },
    { name: 'dark theme', value: 'dark', var: 'dark', id: 2 },
  ];
  const languageInitial = [
    { name: 'English', value: 'en', id: 1 },
    { name: 'Russian', value: 'ru', id: 2 },
    { name: 'Belorussian', value: 'be', id: 3 },
  ];
  const dispatch = useDispatch();
  const setLang = (lang: string) => dispatch(setLanguage(lang));
  const setSett = (sett: ISettingsState) => dispatch(setSettings(sett));

  const [sound, setSound] = React.useState<boolean>(true);
  const [firstUser, setFirstUser] = React.useState<string>('');
  const [secondUser, setSecondUser] = React.useState<string>('');
  const [theme, setTheme] = React.useState<string>('light');
  const [newLang, setNewLang] = React.useState<string>('En');

  return (
    <div className="settings">
      <div className="sound">
        <div className="soundText">Sound:</div>
        <ButtonGroup toggle size="sm">
          {soundInitial.map((s: IButtonGroupSound) => (
            <ToggleButton
              key={s.id}
              type="radio"
              variant="secondary"
              name="radio"
              value={s.value}
              checked={sound === s.value}
              onChange={() => setSound(s.value)}
            >
              {s.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>

      <User userName={firstUser} setUserName={setFirstUser} userText="First user name" />
      <User userName={secondUser} setUserName={setSecondUser} userText="Second user name" />

      <div className="theme">
        <div className="themeText">Choose theme:</div>
        <ButtonGroup toggle size="sm">
          {themeInitial.map((t: IButtonGroupTheme) => (
            <ToggleButton
              key={t.id}
              type="radio"
              variant={t.var}
              name="radio"
              value={t.value}
              checked={theme === t.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTheme(e.target.value)}
            >
              {t.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>

      <div className="lang">
        <div className="langText">Language:</div>
        <ButtonGroup toggle size="sm">
          {languageInitial.map((l: IButtonGroupLang) => (
            <ToggleButton
              key={l.id}
              type="radio"
              variant="secondary"
              name="radio"
              value={l.value}
              checked={newLang === l.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLang(e.target.value);
                setNewLang(e.target.value);
              }}
            >
              {l.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
      <div className="btn-save">
        <Button
          variant="success"
          size="sm"
          onClick={() =>
            setSett({
              lang: newLang,
              isSoundOn: sound,
              gamerName: firstUser === '' ? 'User 1' : firstUser,
              secondGamerName: secondUser === '' ? 'User 2' : firstUser,
              currentTheme: theme,
            })
          }
        >
          Save settings
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() =>
            setSett({
              lang: 'en',
              isSoundOn: true,
              gamerName: 'Gamer 1',
              secondGamerName: 'Gamer 2',
              currentTheme: 'light',
            })
          }
        >
          don`t save settings
        </Button>
      </div>
    </div>
  );
};
