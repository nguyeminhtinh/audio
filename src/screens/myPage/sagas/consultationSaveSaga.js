import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on CONSULTATION_SAVE actions
function* consultationSave(action) {
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     
     *
     */

    const response = yield call(() =>
      API.post(ROUTES.CONSULTATION_SAVE, action.data)
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response?.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.CONSULTATION_SAVE_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      const data = response?.data;
      yield put({
        type: Types.CONSULTATION_SAVE_FAILED,
        data,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.CONSULTATION_SAVE_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `CONSULTATION_SAVE` action.
*/
function* consultationSaveSaga() {
  yield takeLatest(Types.CONSULTATION_SAVE, consultationSave);
}

export default consultationSaveSaga;
