import React from 'react';
import { Link } from 'react-router-dom';
import { routes, Theme } from '@constants';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IAppState } from '@types';
import './home.scss';

export const Home = (): JSX.Element => {
  const { t } = useTranslation();
  const themeInitial = useSelector((state: IAppState) => state.settings.currentTheme);
  const themeChange = themeInitial === Theme.light ? 'home__menu home__menu-light' : 'home__menu home__menu-dark';

  return (
    <>
      <ul className="main home__wrapper">
        <Link to={routes.SET_GAME}>
          <li className={themeChange}>{t('links.new-game')}</li>
        </Link>
        <Link to={routes.RATING}>
          <li className={themeChange}>{t('links.rating')}</li>
        </Link>
        <Link to={routes.SETTINGS}>
          <li className={themeChange}>{t('links.settings')}</li>
        </Link>
        <Link to={routes.ABOUT}>
          <li className={themeChange}>{t('links.about')}</li>
        </Link>
      </ul>
    </>
  );
};
