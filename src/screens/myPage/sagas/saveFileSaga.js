import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SAVE_FILE actions
function* saveFile(action) {
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_SAVE_FILE(action.id), action.data)
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response?.data?.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.SAVE_FILE_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.SAVE_FILE_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.SAVE_FILE_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `SAVE_FILE` action.
*/
function* saveFileSaga() {
  yield takeLatest(Types.SAVE_FILE, saveFile);
}

export default saveFileSaga;
