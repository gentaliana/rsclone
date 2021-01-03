import * as React from 'react';
import { FormControl } from 'react-bootstrap';

type UserProps = {
  userName: string;
  setUserName: (name: string) => void;
  userText: string;
};
export const User = ({ userName, setUserName, userText }: UserProps): JSX.Element => (
  <div className="user">
    <div className="userText">{userText}</div>
    <FormControl
      placeholder={userText}
      aria-label="Username"
      aria-describedby="basic-addon1"
      value={userName}
      onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
    />
  </div>
);
