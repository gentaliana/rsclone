import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { defaultState } from './default-state';
import { rootReducer } from './rootReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const AppStore = createStore(rootReducer, defaultState, composeEnhancers(applyMiddleware(thunk)));

export * from './default-state';
export * from './reducers';
export * from './actions';
