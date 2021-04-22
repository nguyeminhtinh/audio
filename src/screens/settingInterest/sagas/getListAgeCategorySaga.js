import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_AGE_CATEGORY actions
function* GetListAgeCategory() {
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     
     *
     */
    const response = yield call(() => API.get(ROUTES.AGE_CATEGORY));
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response.data.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_AGE_CATEGORY_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_AGE_CATEGORY_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_AGE_CATEGORY_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_AGE_CATEGORY` action.
*/
function* GetListAgeCategorySaga() {
  yield takeLatest(Types.GET_AGE_CATEGORY, GetListAgeCategory);
}

export default GetListAgeCategorySaga;
