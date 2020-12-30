import * as React from 'react';
// import './field.scss';

type FieldProps = {
  currentLetter: string;
};

export const Field = ({ currentLetter }: FieldProps): JSX.Element => <div>{currentLetter}</div>;
