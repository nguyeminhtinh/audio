/* eslint-disable camelcase */
import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';

import { Types } from '../redux';

// worker Saga: will be fired on SIGN_IN actions
function* signInApple(action) {
  try {
    /**
     * Example data
     * url: enpoint/register
     
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_SIGN_IN_APPLE, action.data)
    );

    if (response.ok) {
      const { data } = response;
      // In case: signup request success
      yield put({ type: Types.SIGN_IN_APPLE_SUCCESS, data });
    } else {
      const { msg } = response?.data?.status;
      // In case: signup request failed
      yield put({
        type: Types.SIGN_IN_APPLE_FAILED,
        error: msg,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.SIGN_IN_APPLE_FAILED, error });
  }
}

/*
  Starts signInApple on each dispatched `SIGN_IN_APPLE` action.
*/
function* signInAppleSaga() {
  yield takeLatest(Types.SIGN_IN_APPLE, signInApple);
}

export default signInAppleSaga;
