import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

function* getKeySearchAutoComplete(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.API_SEARCH_FILTER(encodeURIComponent(action.keyword)))
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response?.data?.body?.response || [];
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_KEY_SEARCH_AUTO_COMPLETE_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_KEY_SEARCH_AUTO_COMPLETE_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_KEY_SEARCH_AUTO_COMPLETE_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_KEY_SEARCH_AUTO_COMPLETE` action.
*/
function* getKeySearchAutoCompleteSaga() {
  yield takeLatest(
    Types.GET_KEY_SEARCH_AUTO_COMPLETE,
    getKeySearchAutoComplete
  );
}

export default getKeySearchAutoCompleteSaga;
