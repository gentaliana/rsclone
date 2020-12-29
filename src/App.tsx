import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main, NotFound, SetGame, Game, Rating, Settings, About } from '@pages';
import { Header, Footer } from '@components';
import { routes } from '@constants';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route exact path={routes.HOME} component={Main} />
          <Route path={routes.SET_GAME} component={SetGame} />
          <Route path={routes.GAME} component={Game} />
          <Route path={routes.RATING} component={Rating} />
          <Route path={routes.SETTINGS} component={Settings} />
          <Route path={routes.ABOUT} component={About} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
