import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main } from '@pages';
import { SetGame } from '@pages';
import { routes } from './routes';
import { Rating } from '@pages';
import { Game } from '@pages';
import { Settings } from '@pages';
import { About } from '@pages';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path={routes.HOME}>
        <Main />
      </Route>
      <Route path={routes.SET_GAME}>
        <SetGame />
      </Route>
      <Route path={routes.GAME}>
        <Game />
      </Route>
      <Route path={routes.RATING}>
        <Rating />
      </Route>
      <Route path={routes.SETTINGS}>
        <Settings />
      </Route>
      <Route path={routes.ABOUT}>
        <About />
      </Route>
    </Switch>
  );
}

export default App;
