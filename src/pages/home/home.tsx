import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '@constants';
import { useTranslation } from 'react-i18next';
import './home.scss';

export const Home = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <ul className="main">
        <li>
          <Link to={routes.SET_GAME}>{t('links.new-game')}</Link>
        </li>
        <li>
          <Link to={routes.RATING}>{t('links.rating')}</Link>
        </li>
        <li>
          <Link to={routes.SETTINGS}>{t('links.settings')}</Link>
        </li>
        <li>
          <Link to={routes.ABOUT}>{t('links.about')}</Link>
        </li>
      </ul>
    </>
  );
};
