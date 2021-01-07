import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface ILoaderProps {
  color?: string;
  className?: string;
}

export const Loader = (props: ILoaderProps): JSX.Element => {
  const { color, className } = props;
  return <Spinner animation="border" role="status" variant={color} className={className} />;
};

Loader.defaultProps = {
  color: '',
  className: '',
};
