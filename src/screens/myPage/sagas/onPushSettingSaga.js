import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on HANDLE_PUSH actions
function* handlePush(action) {
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_PUSH_SETTING, action.data)
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response?.data?.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.HANDLE_PUSH_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.HANDLE_PUSH_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.HANDLE_PUSH_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `HANDLE_PUSH` action.
*/
function* handlePushSaga() {
  yield takeLatest(Types.HANDLE_PUSH, handlePush);
}

export default handlePushSaga;
