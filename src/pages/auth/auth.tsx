import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput } from '@components';
import { Button } from 'react-bootstrap';
import { Api } from '@constants';
import { useApi, useAuth } from '@hooks';
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

  const registerHandler = async () => {
    try {
      const { url, method, body } = Api.REGISTER;
      const data = await request(url, method, body(login, password));
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const loginHandler = async () => {
    try {
      const { url, method, body } = Api.LOGIN;
      const data = await request(url, method, body(login, password));
      auth.login(data.token, data.userId);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="auth__wrapper">
      <TextInput placeholder={t('auth.login')} classInput="auth__input auth__style" value={login} onChange={setLogin} />
      {/* <TextInput
        placeholder={t('auth.password')}
        classInput="auth__input auth__style"
        value={password}
        onChange={setPassword}
        type="password"
      /> */}
      {/* TODO: handle if isAuth */}
      {auth.isAuth ? 'auth' : 'no'}
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
