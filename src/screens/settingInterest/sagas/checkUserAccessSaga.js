import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on CHECK_USER_ACCESS actions
function* CheckUserAccess(action) {
  try {
    /**
     * Example data
     * url: enpoint/user/access
     
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.USER_ACCESS, action.data)
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const { data } = response;
      // In case: user/access request success
      yield put({ type: Types.CHECK_USER_ACCESS_SUCCESS, data });
    } else {
      // In case: user/access request failed
      yield put({
        type: Types.CHECK_USER_ACCESS_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.CHECK_USER_ACCESS_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `CHECK_USER_ACCESS` action.
*/
function* CheckUserAccessSaga() {
  yield takeLatest(Types.CHECK_USER_ACCESS, CheckUserAccess);
}

export default CheckUserAccessSaga;
