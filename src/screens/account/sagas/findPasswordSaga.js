/* eslint-disable camelcase */
import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';

import { Types } from '../redux';

// worker Saga: will be fired on FIND_PASSWORD actions
function* findPassword(action) {
  try {
    /**
     * Example data
     * url: enpoint/register
     
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_FIND_PASSWORD, action.data)
    );

    if (response.ok) {
      const { data } = response;
      // In case: signup request success
      yield put({ type: Types.FIND_PASSWORD_SUCCESS, data });
    } else {
      const { msg } = response?.data?.status;
      // In case: signup request failed
      yield put({
        type: Types.FIND_PASSWORD_FAILED,
        error: msg,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.FIND_PASSWORD_FAILED, error });
  }
}

/*
  Starts findPassword on each dispatched `FIND_PASSWORD` action.
*/
function* findPasswordSaga() {
  yield takeLatest(Types.FIND_PASSWORD, findPassword);
}

export default findPasswordSaga;
