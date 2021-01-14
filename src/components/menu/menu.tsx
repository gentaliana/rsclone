import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { DEFAULT_LANG, routes, Languages } from '@constants';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IAppState } from '@types';
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

  const isGameStart = useSelector((state: IAppState) => state.game.isGameStart);

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
        {!isGameStart && (
          <li className="menu__item">
            <SelectOption
              setCurrShowingData={changeLanguage}
              options={Languages}
              title={DROPDOWN_TITLES.translations}
            />
          </li>
        )}
      </ul>
    </nav>
  );
};
