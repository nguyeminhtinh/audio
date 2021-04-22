import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

function* searchCategory(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.API_SEARCH_CATEGORY, action.data)
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response.data.body;
      // In case: search category request success
      yield put({ type: Types.SEARCH_CATEGORY_SUCCESS, data });
    } else {
      // In case: search category request failed
      yield put({
        type: Types.SEARCH_CATEGORY_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.SEARCH_CATEGORY_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `SEARCH_CATEGORY` action.
*/
function* searchCategorySaga() {
  yield takeLatest(Types.SEARCH_CATEGORY, searchCategory);
}

export default searchCategorySaga;
