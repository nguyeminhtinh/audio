/* eslint-disable camelcase */
import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';

import { Types } from '../redux';

// worker Saga: will be fired on CHECK_EMAIL actions
function* checkEmail(action) {
  try {
    /**
     * Example data
     * url: enpoint/register
     
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_CHECK_EMAIL, action.email)
    );

    if (response.ok) {
      const { data } = response;
      // In case: signup request success
      yield put({ type: Types.CHECK_EMAIL_SUCCESS, data });
    } else {
      const { msg } = response?.data?.status;
      // In case: signup request failed
      yield put({
        type: Types.CHECK_EMAIL_FAILED,
        error: msg,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.CHECK_EMAIL_FAILED, error });
  }
}

/*
  Starts checkEmail on each dispatched `CHECK_EMAIL` action.
*/
function* checkEmailSaga() {
  yield takeLatest(Types.CHECK_EMAIL, checkEmail);
}

export default checkEmailSaga;
