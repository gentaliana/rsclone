import * as React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/icons/rs_school_js.svg';
import './footer.scss';

export const Footer = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="footer-wrapper">
        <div>
          <span>
            {t('footer.by')}
            &nbsp;
            <a href="https://github.com/LiliyaSm" target="_blank" rel="noreferrer">
              LiliyaSm
            </a>
            &nbsp;
          </span>
          <span>
            <a href="https://github.com/gentaliana" target="_blank" rel="noreferrer">
              Gentaliana
            </a>
            ,
          </span>
          <span>
            <a href="https://github.com/ryabykhms" target="_blank" rel="noreferrer">
              &nbsp;Ryabykhms
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
