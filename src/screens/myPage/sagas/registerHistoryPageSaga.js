import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on REGISTER_HISTORY_PAGE actions
function* registerHistoryPage(action) {
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.API_REGISTER_HISTORY_PAGE(action.data))
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response?.data?.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.REGISTER_HISTORY_PAGE_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.REGISTER_HISTORY_PAGE_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.REGISTER_HISTORY_PAGE_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `REGISTER_HISTORY_PAGE` action.
*/
function* registerHistoryPageSaga() {
  yield takeLatest(Types.REGISTER_HISTORY_PAGE, registerHistoryPage);
}

export default registerHistoryPageSaga;
