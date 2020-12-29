import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '@constants';
import './menu.css';

export const Menu = (): JSX.Element => (
  <nav>
    <ul className="menu">
      <li className="menu__item">
        <NavLink className="menu__link" exact to={routes.HOME} activeClassName="menu__link--active">
          Home
        </NavLink>
      </li>
      <li className="menu__item">
        <NavLink className="menu__link" to={routes.SET_GAME} activeClassName="menu__link--active">
          New Game
        </NavLink>
      </li>
      <li className="menu__item">
        <NavLink className="menu__link" to={routes.SETTINGS} activeClassName="menu__link--active">
          Settings
        </NavLink>
      </li>
      <li className="menu__item">
        <NavLink className="menu__link" to={routes.RATING} activeClassName="menu__link--active">
          Rating
        </NavLink>
      </li>
      <li className="menu__item">
        <NavLink className="menu__link" to={routes.ABOUT} activeClassName="menu__link--active">
          About
        </NavLink>
      </li>
    </ul>
  </nav>
);
