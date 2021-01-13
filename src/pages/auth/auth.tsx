import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput } from '@components';
import { Button } from 'react-bootstrap';
import { Api, NOTIFY_TYPES } from '@constants';
import { useApi, useAuth } from '@hooks';
import { useDispatch } from 'react-redux';
import { setNotify } from '@store';
import './auth.scss';

interface IAuthProps {
  isRegister?: boolean;
}

export const Auth = (props: IAuthProps): JSX.Element => {
  const { isRegister } = props;
  const { t } = useTranslation();
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { loading, request, error, clearError } = useApi();
  const auth = useAuth();

  useEffect(() => {
    // TODO add popup/toast for message about error
    clearError();
  }, [error, clearError]);

  const dispatch = useDispatch();
  const openModal = React.useCallback(
    (headerText: string, contentText: string, variant: string = NOTIFY_TYPES.success) => {
      dispatch(setNotify({ headerText, contentText, variant }));
    },
    [dispatch],
  );

  const registerHandler = async () => {
    try {
      const { url, method, body } = Api.REGISTER;
      const data = await request(url, method, body(login, password));
      await openModal('Регистрация', data.message);
    } catch (e) {
      await openModal('Ошибка регистрации', e.message, NOTIFY_TYPES.error);
    }
  };

  const loginHandler = async () => {
    try {
      const { url, method, body } = Api.LOGIN;
      const data = await request(url, method, body(login, password));
      auth.login(data.token, data.userId);
      await openModal('Вход', data.message);
    } catch (e) {
      await openModal('Ошибка входа', e.message, NOTIFY_TYPES.error);
    }
  };

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
          <Button className="auth__button" variant="success" onClick={registerHandler} disabled={loading}>
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
          <Button className="auth__button" variant="success" onClick={loginHandler} disabled={loading}>
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
