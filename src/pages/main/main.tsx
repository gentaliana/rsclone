import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '@constants';
import './main.css';

export const Main = (): JSX.Element => (
  <ul>
    <li>
      <Link to={routes.SET_GAME}>New Game</Link>
    </li>
    <li>
      <Link to={routes.RATING}>Rating</Link>
    </li>
    <li>
      <Link to={routes.SETTINGS}>Settings</Link>
    </li>
    <li>
      <Link to={routes.ABOUT}>About</Link>
    </li>
  </ul>
);
