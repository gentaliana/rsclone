import * as React from 'react';
import { Button } from 'react-bootstrap';

type ButtonProps = {
  param: boolean;
  classBtn: string;
  variant: string;
  onClick: (name: boolean) => void;
  first: string;
  second: string;
};
export const ButtonToggle = ({ param, classBtn, variant, onClick, first, second }: ButtonProps): JSX.Element => (
  <Button
    variant={variant}
    type="button"
    className={classBtn}
    onClick={() => onClick(!param)}
  >
    {param ? first : second}
  </Button>
);
