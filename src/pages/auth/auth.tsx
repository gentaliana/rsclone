import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput } from '@components';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setNotify } from '@store';
import { NOTIFY_TYPES } from '@constants';
import './auth.scss';

interface IAuthProps {
  isRegister?: boolean;
}

export const Auth = (props: IAuthProps): JSX.Element => {
  const { isRegister } = props;
  const { t } = useTranslation();
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();
  const openModal = React.useCallback(() => {
    dispatch(setNotify({ headerText: 'Вход', contentText: 'Успешный вход', variant: NOTIFY_TYPES.success }));
  }, [dispatch]);

  return (
    <div className="auth__wrapper">
      <TextInput placeholder={t('auth.login')} classInput="auth__input auth__style" value={login} onChange={setLogin} />
      {isRegister ? (
        <>
          <TextInput
            placeholder={t('auth.password')}
            classInput="auth__input auth__style"
            value={password}
            onChange={setPassword}
            type="password"
          />
          <TextInput
            placeholder={t('auth.confirm')}
            classInput="auth__input auth__style"
            value={password}
            onChange={setPassword}
            type="password"
          />
          <Button className="auth__button" variant="success">
            {t('auth.register')}
          </Button>
        </>
      ) : (
        <>
          <TextInput
            placeholder={t('auth.password')}
            classInput="auth__input auth__style"
            value={password}
            onChange={setPassword}
            type="password"
          />
          <Button className="auth__button" variant="success" onClick={openModal}>
            {t('auth.entry')}
          </Button>
        </>
      )}
    </div>
  );
};

Auth.defaultProps = {
  isRegister: false,
};
