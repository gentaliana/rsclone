import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home, NotFound, SetGame, Game, Rating, Settings, About, Auth, User } from '@pages';
import { Header, Footer, Alerts } from '@components';
import { routes, Theme } from '@constants';
import { IAppState } from '@types';
import { setDefSettingsToStorage } from './utils/setDefSettingsToStorage';
import BACKGROUND_LIGHT from './assets/images/background-light.jpg';
import BACKGROUND_DARK from './assets/images/background-dark.jpg';
import './App.scss';

function App(): JSX.Element {
  const notify = useSelector((state: IAppState) => state.notify);
  const themeInitial = useSelector((state: IAppState) => state.settings.currentTheme);

  if (localStorage.getItem('settings') === null) {
    setDefSettingsToStorage();
  }

  return (
    <div className="wrapper">
      {notify ? <Alerts notify={notify} /> : null}
      <Header />
      <main className="main">
        <Switch>
          <Route exact path={routes.AUTH} component={Auth} />
          <Route exact path={routes.HOME} component={Home} />
          <Route path={routes.SET_GAME} component={SetGame} />
          <Route path={routes.GAME} component={Game} />
          <Route path={routes.RATING} component={Rating} />
          <Route path={routes.SETTINGS} component={Settings} />
          <Route path={routes.ABOUT} component={About} />
          <Route path={routes.USER} component={User} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      {themeInitial === Theme.light ? (
        <img src={BACKGROUND_LIGHT} alt="background" className="background" />
      ) : (
        <img src={BACKGROUND_DARK} alt="background" className="background" />
      )}
      <div className="background_overlay" />
    </div>
  );
}

export default App;
