import {createBrowserHistory} from 'history';
import throttle from 'lodash.throttle';
import {routerMiddleware} from 'react-router-redux';
import {applyMiddleware, createStore, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeEnhancers} from '../utils/composeEnhancers';
import rootReducer, {ApplicationState} from './reducers/rootReducer';
import rootSaga from './reducers/rootSaga';
import {loadState, saveState} from './services/localStorage';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware, routerMiddleware(history)),
);

const persistedState = loadState();

const store: Store<ApplicationState> = createStore(
  rootReducer(history),
  persistedState,
  enhancer,
);

sagaMiddleware.run(rootSaga);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000),
);

export default store;
