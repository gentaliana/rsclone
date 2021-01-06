import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { useDispatch } from 'react-redux';
import { removeNotify } from '@store';
import { INotify } from '@types';
import './alerts.scss';

interface IAlertsProps {
  notify: INotify | null;
}

export const Alerts = (props: IAlertsProps): JSX.Element => {
  const { notify } = props;

  const dispatch = useDispatch();
  const onRemoveNotify = () => dispatch(removeNotify());

  return (
    <div className="alert-message page-center">
      <Alert variant="danger" onClose={onRemoveNotify} dismissible>
        <Alert.Heading>{notify?.headerText}</Alert.Heading>
        <p>{notify?.contentText}</p>
      </Alert>
    </div>
  );
};
