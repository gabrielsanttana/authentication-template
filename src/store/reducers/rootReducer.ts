import {combineReducers} from 'redux-immutable';
import {Map} from 'immutable';
import {History} from 'history';
import {connectRouter, RouterState} from 'connected-react-router';
import catsReducer, {CatsState} from '../reducers/cats';
import authenticationReducer, {
  AuthenticationState,
} from '../reducers/authentication';

export interface ApplicationState extends Map<any, any> {
  readonly authentication: AuthenticationState;
  readonly router: RouterState;
  readonly cats: CatsState;
}

const rootReducer = (history: History) =>
  combineReducers({
    authentication: authenticationReducer,
    router: connectRouter(history),
    cats: catsReducer,
  });

export default rootReducer;
