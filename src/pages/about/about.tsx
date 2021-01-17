import * as React from 'react';
import { useTranslation } from 'react-i18next';
import './about.scss';

export const About = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className="about__wrapper">
      <h3>{t('help.rulesGame')}</h3>
      <ul className="about__rulles-one">
        <li>{t('help.listRules.one')}</li>
        <li>{t('help.listRules.two')}</li>
        <li>{t('help.listRules.tree')}</li>
        <li>{t('help.listRules.four')} </li>
        <li>{t('help.listRules.five')} </li>
        <li>{t('help.listRules.six')}</li>
        <li>{t('help.listRules.seven')}</li>
      </ul>
      <h3>{t('help.move.header')}</h3>
      <ul className="about__rulles-one">
        <li>{t('help.move.one')}</li>
        <li>{t('help.move.two')}</li>
        <li>{t('help.move.tree')}</li>
      </ul>
      <h3>{t('help.keyboardMove.header')}</h3>
      <ul className="about__rulles-one">
        <li>{t('help.keyboardMove.one')}</li>
        <li>{t('help.keyboardMove.two')}</li>
        <li>{t('help.keyboardMove.tree')}</li>
        <li>{t('help.keyboardMove.four')}</li>
        <li>{t('help.keyboardMove.five')}</li>
      </ul>
      <h3>{t('help.additionally')}</h3>
      <span className="about__rulles-one">{t('help.penalties')}</span>
      {/* TODO добавить еще правил */}
    </div>
  );
};
