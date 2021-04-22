import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_LIST_REVIEW actions
function* getListReview(action) {
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     
     *
     */

    const response = yield call(() =>
      API.get(ROUTES.API_GET_LIST_REVIEW(action.id), action.data)
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response.data.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_LIST_REVIEW_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_LIST_REVIEW_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_REVIEW_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_LIST_REVIEW` action.
*/
function* getListReviewSaga() {
  yield takeLatest(Types.GET_LIST_REVIEW, getListReview);
}

export default getListReviewSaga;
