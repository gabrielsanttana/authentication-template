import {fromJS, Map} from 'immutable';
import {push} from 'react-router-redux';
import {AnyAction, Reducer} from 'redux';
import {call, put} from 'redux-saga/effects';
import {createSelector} from 'reselect';
import {ApplicationState} from '../rootReducer';
import {deleteCookie, setCookie} from '../../services/api';
import {
  LoginRequest,
  loginService,
} from '../../services/authenticationServices';
import {action} from 'typesafe-actions';

//Actions types
export enum AuthenticationTypes {
  LOGIN_REQUEST = '@authentication/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@authentication/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@authentication/LOGIN_FAILURE',

  LOGOUT_REQUEST = '@authentication/LOGOUT_REQUEST',
  LOGOUT_SUCCESS = '@authentication/LOGOUT_SUCCESS',
  LOGOUT_FAILURE = '@authentication/LOGOUT_FAILURE',
}

//Data types
export interface Login {
  is_authenticated: boolean;
  user: string;
  user_roles: string[];
}

//State type
export interface AuthenticationState extends Map<any, any> {
  readonly data: ImmutableMap<Login> | undefined;
  readonly loading: boolean;
  readonly error: boolean;
}

export interface LoginActionProps extends LoginRequest {
  nextRoute?: string;
}

//Login actions
export const loginUserRequest = (data: LoginActionProps) =>
  action(AuthenticationTypes.LOGIN_REQUEST, {data});

export const loginSuccess = (data: Login) =>
  action(AuthenticationTypes.LOGIN_SUCCESS, {data});

export const loginFailure = () => action(AuthenticationTypes.LOGIN_FAILURE);

//Logout actions
export const logoutUserRequest = () =>
  action(AuthenticationTypes.LOGOUT_REQUEST);

export const logoutSuccess = () => action(AuthenticationTypes.LOGOUT_SUCCESS);

export const logoutFailure = () => action(AuthenticationTypes.LOGOUT_FAILURE);

//Sagas
export function* loginUser(action: AnyAction) {
  try {
    const response = yield call(loginService, action.payload.data);

    yield call(setCookie, {
      name: 'csrftoken',
      value: response.data.token,
    });
    yield put(loginSuccess(response.data));
    yield put(push(action.payload.nextRoute));
  } catch (err) {
    yield put(loginFailure());
  }
}

export function* logoutUser() {
  try {
    yield call(deleteCookie, {
      name: 'csrftoken',
    });
    yield put(logoutSuccess());
    yield put(push('/login'));
  } catch (err) {
    yield put(logoutFailure());
  }
}

//Initial state
export const INITIAL_STATE: AuthenticationState = fromJS({
  data: fromJS({}),
  error: false,
  loading: false,
});

//Selectors
const authenticationSelector = (state: ApplicationState) =>
  state.get('authentication');

export const getAuthenticationError = createSelector(
  authenticationSelector,
  (authentication) => authentication.get('error'),
);

//Reducer
const reducer: Reducer<AuthenticationState> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case AuthenticationTypes.LOGIN_REQUEST:
      return state.withMutations((prevState) => prevState.set('loading', true));

    case AuthenticationTypes.LOGIN_SUCCESS:
      return state.withMutations((prevState) => {
        return prevState
          .set('loading', false)
          .set('error', false)
          .set('data', fromJS(action.payload.data));
      });

    case AuthenticationTypes.LOGIN_FAILURE:
      return state.withMutations((prevState) =>
        prevState
          .set('loading', false)
          .set('error', true)
          .set('data', fromJS({})),
      );

    case AuthenticationTypes.LOGOUT_REQUEST:
      return state.withMutations((prevState) => prevState.set('loading', true));

    case AuthenticationTypes.LOGOUT_SUCCESS:
      return state.withMutations((prevState) =>
        prevState
          .set('loading', false)
          .set('error', false)
          .set('data', fromJS({})),
      );

    case AuthenticationTypes.LOGOUT_FAILURE:
      return state.withMutations((prevState) =>
        prevState
          .set('loading', false)
          .set('error', true)
          .set('data', fromJS({})),
      );

    default:
      return state;
  }
};

export default reducer;
