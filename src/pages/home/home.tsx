import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '@constants';
import { useTranslation } from 'react-i18next';
import { SelectOption } from 'src/components/selectOption';
import { DEFAULT_LANG, Languages } from 'src/constants/languages';
import './home.scss';

export const Home = (): JSX.Element => {
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
  return (
    <>
      <SelectOption setCurrShowingData={changeLanguage} options={Languages} title={DROPDOWN_TITLES.translations} />
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
