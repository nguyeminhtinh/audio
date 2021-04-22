import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SETTING_INTEREST actions
function* SettingInterestSaga(action) {
  try {
    /**
     * Example data
     * url: enpoint/setting/user
     
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.SETTING_USER, JSON.stringify(action.data))
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response.data.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.SETTING_INTEREST_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.SETTING_INTEREST_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.SETTING_INTEREST_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `SETTING_INTEREST` action.
*/
function* SettingInterestSagaSaga() {
  yield takeLatest(Types.SETTING_INTEREST, SettingInterestSaga);
}

export default SettingInterestSagaSaga;
