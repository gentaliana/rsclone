import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { setSound, setMusic, setLanguage } from '@store';
import { DEFAULT_LANG, routes, Languages, Theme } from '@constants';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '@types';
import { AudioPlayer } from '@components';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { BsFillVolumeUpFill, BsFillVolumeMuteFill, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { SelectOption } from '../selectOption';
import musicfile from '../../assets/sound/sound.mp3';
import './menu.scss';

export const Menu = (): JSX.Element => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string | null) => {
    const lang = lng || DEFAULT_LANG;
    i18n.changeLanguage(lang);
    const langEnum = Languages[lang as keyof typeof Languages];
    const setGameSettings = (lngToSet: string) => dispatch(setLanguage(lngToSet));
    setGameSettings(langEnum);
  };

  const DROPDOWN_TITLES = useMemo(
    () => ({
      translations: t('dropdown.titles.language'),
    }),
    [t],
  );

  const setIsSound = (sound: boolean) => dispatch(setSound(sound));
  const setIsMusic = (music: boolean) => dispatch(setMusic(music));

  const isGameStart = useSelector((state: IAppState) => state.game.isGameStart);
  const isSoundOn = useSelector((state: IAppState) => state.settings.isSoundOn);
  const isMusicOn = useSelector((state: IAppState) => state.settings.isMusicOn);

  const themeInitial = useSelector((state: IAppState) => state.settings.currentTheme);
  const themeChange = themeInitial === Theme.light ? 'menu__link-light' : 'menu__link-dark';
  const themeActiveLink = themeInitial === Theme.light ? 'menu__link-light--active' : 'menu__link-dark--active';
  const themeBg = themeInitial === Theme.light ? 'light' : 'dark';

  return (
    <Navbar bg={themeBg} variant={themeBg} collapseOnSelect expand="md">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" variant="pills" justify>
            <NavLink className={themeChange} exact to={routes.HOME} activeClassName={themeActiveLink}>
              {t('menu.home')}
            </NavLink>
            <NavDropdown.Divider />
            <NavLink className={themeChange} to={routes.SET_GAME} activeClassName={themeActiveLink}>
              {t('menu.newGame')}
            </NavLink>
            <NavDropdown.Divider />
            <NavLink className={themeChange} to={routes.SETTINGS} activeClassName={themeActiveLink}>
              {t('menu.settings')}
            </NavLink>
            <NavDropdown.Divider />
            <NavLink className={themeChange} to={routes.RATING} activeClassName={themeActiveLink}>
              {t('menu.rating')}
            </NavLink>
            <NavDropdown.Divider />
            <NavLink className={themeChange} to={routes.ABOUT} activeClassName={themeActiveLink}>
              {t('menu.about')}
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        <Nav.Item className="menu__link">
          {!isGameStart && (
            <SelectOption
              setCurrShowingData={changeLanguage}
              options={Languages}
              title={DROPDOWN_TITLES.translations}
            />
          )}
        </Nav.Item>
        <Nav.Item className={themeChange}>
          <span>{t('menu.sound')}</span>
          {isSoundOn ? (
            <BsFillVolumeUpFill className="menu__sound" onClick={() => setIsSound(!isSoundOn)} />
          ) : (
            <BsFillVolumeMuteFill className="menu__sound" onClick={() => setIsSound(!isSoundOn)} />
          )}
        </Nav.Item>
        <Nav.Item className={themeChange}>
          <span>{t('menu.music')}</span>
          {isMusicOn ? (
            <BsFillPlayFill className="menu__music" onClick={() => setIsMusic(!isMusicOn)} />
          ) : (
            <BsFillPauseFill className="menu__music" onClick={() => setIsMusic(!isMusicOn)} />
          )}
          <AudioPlayer file={musicfile} format={['mp3']} autoplay loop isMute={!isMusicOn} />
        </Nav.Item>
      </Container>
    </Navbar>
  );
};
