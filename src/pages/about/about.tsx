import * as React from 'react';
import { useTranslation } from 'react-i18next';
import './about.scss';

export const About = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className="about__wrapper">
      <h1>{t('help.rulesGame')}</h1>
      <ul>
        <li>{t('help.listRules.one')}</li>
        <li>{t('help.listRules.two')}</li>
        <li>{t('help.listRules.tree')}</li>
        <li>{t('help.listRules.four')} </li>
        <li>{t('help.listRules.five')} </li>
        <li>{t('help.listRules.six')}</li>
      </ul>
      <h3>{t('help.move.header')}</h3>
      <ul>
        <li>{t('help.move.one')}</li>
        <li>{t('help.move.two')}</li>
        <li>{t('help.move.tree')}</li>
      </ul>
      <h3>{t('help.additionally')}</h3>
      <span>{t('help.start')}</span>
      <span>{t('help.points')}</span>
      {/* TODO добавить еще правил */}
    </div>
  );
};
