import * as React from 'react';
import { TextInput } from '@components';

type UserProps = {
  userName: string;
  setUserName: (name: string) => void;
  userText: string;
};
export const User = ({ userName, setUserName, userText }: UserProps): JSX.Element => (
  <div className="user">
    <div className="userText">{userText}</div>
    <TextInput
      placeholder={userText}
      value={userName}
      classInput="user-inp"
      onChange={setUserName}
    />
  </div>
);
