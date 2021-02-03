import * as React from 'react';
import { IAppState } from '@types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Theme } from '@constants';
import logo from '../../assets/icons/rs_school_js.svg';
import './footer.scss';

export const Footer = (): JSX.Element => {
  const { t } = useTranslation();

  const themeInitial = useSelector((state: IAppState) => state.settings.currentTheme);
  const themeChange = React.useMemo(
    () => `footer-wrapper ${themeInitial === Theme.light ? 'footer-wrapper-light' : 'footer-wrapper-dark'}`,
    [themeInitial],
  );

  return (
    <footer className="footer">
      <div className={themeChange}>
        <div className="footer__content">
          <span>
            {t('footer.by')}
            &nbsp;
            <a href="https://github.com/LiliyaSm" target="_blank" rel="noreferrer">
              LiliyaSm
            </a>
            ,
          </span>
          <span>
            &nbsp;
            <a href="https://github.com/gentaliana" target="_blank" rel="noreferrer">
              Gentaliana
            </a>
            ,
          </span>
          <span>
            &nbsp;
            <a href="https://github.com/ryabykhms" target="_blank" rel="noreferrer">
              Ryabykhms
            </a>
            ,
          </span>
          <span>
            &nbsp;
            <a href="https://github.com/Kulgeyko93" target="_blank" rel="noreferrer">
              Kulgeyko93
            </a>
          </span>
        </div>
        <span>
          <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
            <img alt="logo" className="logo" src={logo} />
          </a>
          2020
        </span>
      </div>
    </footer>
  );
};
