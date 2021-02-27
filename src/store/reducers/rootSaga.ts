import {all, takeLatest} from 'redux-saga/effects';
import {AuthenticationTypes, loginUser, logoutUser} from './authentication';
import {CatsTypes, fetchCatFacts} from './cats';

export default function* rootSaga() {
  yield all([
    takeLatest(AuthenticationTypes.LOGIN_REQUEST, loginUser),
    takeLatest(AuthenticationTypes.LOGOUT_REQUEST, logoutUser),
    takeLatest(CatsTypes.FETCH_CAT_FACTS_REQUEST, fetchCatFacts),
  ]);
}
