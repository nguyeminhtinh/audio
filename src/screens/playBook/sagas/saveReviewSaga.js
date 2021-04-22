import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SAVE_REVIEW actions
function* saveReviewSaga(action) {
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     
     *
     */

    const response = yield call(() =>
      API.post(ROUTES.API_SAVE_REVIEW, action.data)
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response.data.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.SAVE_REVIEW_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.SAVE_REVIEW_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.SAVE_REVIEW_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `SAVE_REVIEW` action.
*/
function* saveReviewSagaSaga() {
  yield takeLatest(Types.SAVE_REVIEW, saveReviewSaga);
}

export default saveReviewSagaSaga;
