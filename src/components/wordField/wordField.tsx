import React from 'react';
import './wordField.scss';

type WordFieldProps = {
  currWord: string;
};

export const WordField = ({ currWord }: WordFieldProps): JSX.Element => <div className="word-field">{currWord}</div>;
