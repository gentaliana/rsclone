import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { TextInput } from '@components';
import { Button, Tab, Tabs } from 'react-bootstrap';
import { Api, NOTIFY_TYPES, routes } from '@constants';
import { useApi, useAuth } from '@hooks';
import { useDispatch } from 'react-redux';
import { setNotify } from '@store';
import './auth.scss';

export const Auth = (): JSX.Element => {
  const { t } = useTranslation();
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { loading, request, error, clearError } = useApi();
  const auth = useAuth();
  const isAuth = !!auth.token;

  useEffect(() => {
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
      await openModal(t('notify.success.register'), data.message);
    } catch (e) {
      await openModal(t('notify.error.register'), e.message, NOTIFY_TYPES.error);
    }
  };

  const loginHandler = async () => {
    try {
      const { url, method, body } = Api.LOGIN;
      const data = await request(url, method, body(login, password));
      auth.login(data.token, data.userId);
      await openModal(t('notify.success.login'), data.message);
      window.location.reload(false);
    } catch (e) {
      await openModal(t('notify.error.login'), e.message, NOTIFY_TYPES.error);
    }
  };

  return (
    <div className="auth__wrapper">
      {isAuth ? <Redirect to={routes.USER.replace(':name', auth.userId || '')} /> : null}
      <Tabs defaultActiveKey="login" id="auth-tab">
        <Tab eventKey="login" title={t('auth.login')}>
          <TextInput
            placeholder={t('auth.login')}
            classInput="auth__input auth__style"
            value={login}
            onChange={setLogin}
          />
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
        </Tab>
        <Tab eventKey="reister" title={t('auth.register')}>
          <TextInput
            placeholder={t('auth.login')}
            classInput="auth__input auth__style"
            value={login}
            onChange={setLogin}
          />
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
        </Tab>
      </Tabs>
    </div>
  );
};

Auth.defaultProps = {
  isRegister: false,
};
