import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home, NotFound, SetGame, Game, Rating, Settings, About } from '@pages';
import { Header, Footer, Alerts } from '@components';
import { routes } from '@constants';
import { IAppState } from '@types';
import './App.scss';

function App(): JSX.Element {
  const notify = useSelector((state: IAppState) => state.notify);

  return (
    <div className="wrapper">
      {notify ? <Alerts notify={notify} /> : null}
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
