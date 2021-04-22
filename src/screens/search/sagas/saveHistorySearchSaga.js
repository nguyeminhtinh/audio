import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

function* saveHistorySearch(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_SAVE_HISTORY_SEARCH, action.data)
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response;
      // In case: setting/ageCategory request success
      yield put({ type: Types.SAVE_HISTORY_SEARCH_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.SAVE_HISTORY_SEARCH_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.SAVE_HISTORY_SEARCH_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `SAVE_HISTORY_SEARCH` action.
*/
function* saveHistorySearchSaga() {
  yield takeLatest(Types.SAVE_HISTORY_SEARCH, saveHistorySearch);
}

export default saveHistorySearchSaga;
