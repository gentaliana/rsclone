import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '@constants';
import { useTranslation } from 'react-i18next';
import './home.scss';

export const Home = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <ul className="main home__wrapper">
        <Link to={routes.SET_GAME}>
          <li className="home__menu">{t('links.new-game')}</li>
        </Link>
        <Link to={routes.RATING}>
          <li className="home__menu">{t('links.rating')}</li>
        </Link>
        <Link to={routes.SETTINGS}>
          <li className="home__menu">{t('links.settings')}</li>
        </Link>
        <Link to={routes.ABOUT}>
          <li className="home__menu">{t('links.about')}</li>
        </Link>
      </ul>
    </>
  );
};
