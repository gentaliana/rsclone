import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, NotFound, SetGame, Game, Rating, Settings, About } from '@pages';
import { Header, Footer } from '@components';
import { routes } from '@constants';
import './App.scss';

function App(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        <Switch>
          <Route exact path={routes.HOME} component={Home} />
          <Route path={routes.SET_GAME} component={SetGame} />
          <Route path={routes.GAME} component={Game} />
          <Route path={routes.RATING} component={Rating} />
          <Route path={routes.SETTINGS} component={Settings} />
          <Route path={routes.ABOUT} component={About} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
