import React from 'react';
import './wordField.scss';

type WordFieldProps = {
  currWord: string;
  infoMessage: string;
};

export const WordField = ({ currWord, infoMessage }: WordFieldProps): JSX.Element => (
  <div className="word-field">{currWord || infoMessage}</div>
);
