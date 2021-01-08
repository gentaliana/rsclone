import * as React from 'react';
import { FormControl } from 'react-bootstrap';

type TextInputProps = {
  placeholder: string;
  value: string;
  classInput: string;
  onChange: (value: string) => void;
};

export const TextInput = ({ placeholder, value, classInput, onChange }: TextInputProps): JSX.Element => (
  <FormControl
    className={classInput}
    placeholder={placeholder}
    value={value}
    aria-label="Username"
    aria-describedby="basic-addon1"
    onInput={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
  />
);
