/* eslint-disable camelcase */
import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';

import { Types } from '../redux';

// worker Saga: will be fired on CHECK_USER_SNS_LOGIN actions
function* checkUserSnsLogin(action) {
  try {
    /**
     * Example data
     * url: enpoint/register
     
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_CHECK_USER_SNS_LOGIN, action.data)
    );

    if (response.ok) {
      const { data } = response;
      // In case: signup request success
      yield put({ type: Types.CHECK_USER_SNS_LOGIN_SUCCESS, data });
    } else {
      const { msg } = response?.data?.status;
      // In case: signup request failed
      yield put({
        type: Types.CHECK_USER_SNS_LOGIN_FAILED,
        error: msg,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.CHECK_USER_SNS_LOGIN_FAILED, error });
  }
}

/*
  Starts checkUserSnsLogin on each dispatched `CHECK_USER_SNS_LOGIN` action.
*/
function* checkUserSnsLoginSaga() {
  yield takeLatest(Types.CHECK_USER_SNS_LOGIN, checkUserSnsLogin);
}

export default checkUserSnsLoginSaga;
