import { createStore, applyMiddleware, compose, AnyAction } from 'redux';
import thunk from 'redux-thunk';
import { defaultState } from '@store';
import { langReducer } from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const AppStore = createStore(
  langReducer,
  defaultState,
  composeEnhancers(applyMiddleware(thunk))
);

export * from './default-state';
export * from './reducers';
export { AppActions } from './actions';
