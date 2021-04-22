import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SET_STATUS_PLAY actions
function* SetStatusPlay(action) {
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     
     *
     */

    const response = yield call(() =>
      API.post(ROUTES.API_USER_STATUS_PLAY, action.data)
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response.data.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.SET_STATUS_PLAY_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.SET_STATUS_PLAY_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.SET_STATUS_PLAY_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `SET_STATUS_PLAY` action.
*/
function* SetStatusPlaySaga() {
  yield takeLatest(Types.SET_STATUS_PLAY, SetStatusPlay);
}

export default SetStatusPlaySaga;
