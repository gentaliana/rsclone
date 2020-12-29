import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage } from '@store';
import './settings.css';

export const Settings = () => {
  const dispatch = useDispatch();
  const setLang = (lang: string) => dispatch(setLanguage(lang));

  return (
    <div>
      <div>
        <span>Select language: </span>
        <button type="button" onClick={() => setLang('ru')}>
          ru
        </button>
        <button type="button" onClick={() => setLang('en')}>
          en
        </button>
      </div>
    </div>
  );
};
