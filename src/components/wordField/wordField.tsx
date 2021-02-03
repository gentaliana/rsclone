import React from 'react';
import { Theme } from '@constants';
import { useSelector } from 'react-redux';
import { IAppState } from '@types';
import './wordField.scss';

type WordFieldProps = {
  currWord: string;
  infoMessage: string;
};

export const WordField = ({ currWord, infoMessage }: WordFieldProps): JSX.Element => {
  const themeInitial = useSelector((state: IAppState) => state.settings.currentTheme);
  const themeChange = themeInitial === Theme.light ? 'word-field-light' : 'word-field-dark';
  return <div className={`word-field ${themeChange}`}>{currWord || infoMessage}</div>;
};
