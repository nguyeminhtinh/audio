import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_ANNOUNCEMENT_HISTORY actions
function* getAnnouncementHistory(action) {
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     
     *
     */

    const response = yield call(() =>
      API.get(ROUTES.API_ANNOUNCEMENT_HISTORY, action.data)
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response.data.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_ANNOUNCEMENT_HISTORY_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_ANNOUNCEMENT_HISTORY_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_ANNOUNCEMENT_HISTORY_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_ANNOUNCEMENT_HISTORY` action.
*/
function* getAnnouncementHistorySaga() {
  yield takeLatest(Types.GET_ANNOUNCEMENT_HISTORY, getAnnouncementHistory);
}

export default getAnnouncementHistorySaga;
