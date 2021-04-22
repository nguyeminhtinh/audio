import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on DELETE_REVIEW_STUDIO actions
function* deleteReviewStudio(action) {
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     
     *
     */

    const response = yield call(() =>
      API.post(ROUTES.API_DELETE_REVIEW_STUDIO(action.id))
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response.data.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.DELETE_REVIEW_STUDIO_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.DELETE_REVIEW_STUDIO_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.DELETE_REVIEW_STUDIO_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `DELETE_REVIEW_STUDIO` action.
*/
function* deleteReviewStudioSaga() {
  yield takeLatest(Types.DELETE_REVIEW_STUDIO, deleteReviewStudio);
}

export default deleteReviewStudioSaga;
