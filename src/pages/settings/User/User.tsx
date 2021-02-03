import React, { useEffect } from 'react';
import { TextInput } from '@components';
import { useTranslation } from 'react-i18next';

type UserProps = {
  id: number;
  userName: string;
  setUserName: (name: string) => void;
  localUserName: string;
  setLocalUserName: (name: string) => void;
  userText: string;
  changeLocalStarageName: (userId: number, userName: string) => void;
};
export const User = (props: UserProps): JSX.Element => {
  const { id, userName, setUserName, localUserName, setLocalUserName, userText, changeLocalStarageName } = props;
  const { t } = useTranslation();

  const validate = (name: string) => {
    if (name !== '' && name.length <= 10) {
      setUserName(name);
      changeLocalStarageName(id, localUserName);
    }
  };

  useEffect(() => {
    validate(localUserName);
  }, [localUserName, userName]);

  return (
    <div className="user">
      <div className="userText">{userText}</div>
      <div className="userInputName">
        <TextInput
          placeholder="Enter yor name"
          value={localUserName}
          classInput="user-inp"
          onChange={(e) => {
            if (e.length >= 0 && e.length <= 10) {
              setLocalUserName(e);
              validate(localUserName);
            }
          }}
        />
        <div className="length-error">{userName.length === 10 ? t('settingPage.maxLength') : ''}</div>
        <div className="name-error">
          {localUserName.length === 0 ? `${t('settingPage.enterName')} ${userName}` : ''}
        </div>
      </div>
    </div>
  );
};
