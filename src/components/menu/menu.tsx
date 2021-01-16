import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { setSound, setMusic } from '@store';
import { DEFAULT_LANG, routes, Languages } from '@constants';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '@types';
import { BsFillVolumeUpFill, BsFillVolumeMuteFill, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { SelectOption } from '../selectOption';
import './menu.scss';

export const Menu = (): JSX.Element => {
  const { i18n, t } = useTranslation();
  const changeLanguage = (lng: string | null) => {
    i18n.changeLanguage(lng ?? DEFAULT_LANG);
  };
  const DROPDOWN_TITLES = useMemo(
    () => ({
      translations: t('dropdown.titles.language'),
    }),
    [t],
  );

  const dispatch = useDispatch();
  const setIsSound = (sound: boolean) => dispatch(setSound(sound));
  const setIsMusic = (music: boolean) => dispatch(setMusic(music));

  const isGameStart = useSelector((state: IAppState) => state.game.isGameStart);
  const isSoundOn = useSelector((state: IAppState) => state.settings.isSoundOn);
  const isMusicOn = useSelector((state: IAppState) => state.settings.isMusicOn);

  return (
    <nav>
      <ul className="menu">
        <li className="menu__item">
          <NavLink className="menu__link" exact to={routes.HOME} activeClassName="menu__link--active">
            {t('menu.home')}
          </NavLink>
        </li>
        <li className="menu__item">
          <NavLink className="menu__link" to={routes.SET_GAME} activeClassName="menu__link--active">
            {t('menu.newGame')}
          </NavLink>
        </li>
        <li className="menu__item">
          <NavLink className="menu__link" to={routes.SETTINGS} activeClassName="menu__link--active">
            {t('menu.settings')}
          </NavLink>
        </li>
        <li className="menu__item">
          <NavLink className="menu__link" to={routes.RATING} activeClassName="menu__link--active">
            {t('menu.rating')}
          </NavLink>
        </li>
        <li className="menu__item">
          <NavLink className="menu__link" to={routes.ABOUT} activeClassName="menu__link--active">
            {t('menu.about')}
          </NavLink>
        </li>
        <span>Sound</span>
        {!isGameStart && (
          <li className="menu__item">
            <SelectOption
              setCurrShowingData={changeLanguage}
              options={Languages}
              title={DROPDOWN_TITLES.translations}
            />
          </li>
        )}
        <li className="menu__item">
          <span>{t('menu.sound')}</span>
          {isSoundOn ? (
            <BsFillVolumeUpFill style={{ fontSize: '30px' }} onClick={() => setIsSound(!isSoundOn)} />
          ) : (
            <BsFillVolumeMuteFill style={{ fontSize: '30px' }} onClick={() => setIsSound(!isSoundOn)} />
          )}
        </li>
        <li className="menu__item">
          <span>{t('menu.music')}</span>
          {isMusicOn ? (
            <BsFillPlayFill style={{ fontSize: '30px' }} onClick={() => setIsMusic(!isMusicOn)} />
          ) : (
            <BsFillPauseFill style={{ fontSize: '30px' }} onClick={() => setIsMusic(!isMusicOn)} />
          )}
        </li>
      </ul>
    </nav>
  );
};
