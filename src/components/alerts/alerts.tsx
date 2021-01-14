import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { useDispatch } from 'react-redux';
import { removeNotify } from '@store';
import { INotify } from '@types';
import { NOTIFY_TYPES } from '@constants';
import './alerts.scss';

interface IAlertsProps {
  notify: INotify | null;
}

export const Alerts = (props: IAlertsProps): JSX.Element => {
  const { notify } = props;

  const dispatch = useDispatch();
  const onRemoveNotify = React.useCallback(() => dispatch(removeNotify()), [dispatch]);

  React.useEffect(() => {
    setTimeout(onRemoveNotify, 3000);
  }, []);

  return (
    <div className="alert-message page-center">
      <Alert variant={notify?.variant ?? NOTIFY_TYPES.error} onClose={onRemoveNotify} dismissible>
        <Alert.Heading>{notify?.headerText}</Alert.Heading>
        <p>{notify?.contentText}</p>
      </Alert>
    </div>
  );
};
