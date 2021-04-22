import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SETTING_USER_CATEGORY actions
function* getCategorySetting() {
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     
     *
     */

    const response = yield call(() =>
      API.get(ROUTES.API_SETTING_USER_CATEGORY)
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response.data.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.SETTING_USER_CATEGORY_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.SETTING_USER_CATEGORY_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.SETTING_USER_CATEGORY_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `SETTING_USER_CATEGORY` action.
*/
function* getCategorySettingSaga() {
  yield takeLatest(Types.SETTING_USER_CATEGORY, getCategorySetting);
}

export default getCategorySettingSaga;
