import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SETTING_CONTENT_USER actions
function* settingContent(action) {
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     
     *
     */

    const response = yield call(() =>
      API.post(ROUTES.API_SETTING_CONTENT, JSON.stringify(action.data))
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response?.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.SETTING_CONTENT_USER_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      const data = response?.data;
      yield put({
        type: Types.SETTING_CONTENT_USER_FAILED,
        data,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.SETTING_CONTENT_USER_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `SETTING_CONTENT_USER` action.
*/
function* settingContentSaga() {
  yield takeLatest(Types.SETTING_CONTENT_USER, settingContent);
}

export default settingContentSaga;
