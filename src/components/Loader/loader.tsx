import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface ILoaderProps {
  color?: string;
  className?: string;
}

export const Loader = ({ color, className }: ILoaderProps): JSX.Element => (
  <Spinner animation="border" role="status" variant={color} className={className} />
);

Loader.defaultProps = {
  color: '',
  className: '',
};
