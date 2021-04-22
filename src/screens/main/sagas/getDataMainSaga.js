import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_DATA_MAIN actions
function* GetDataMain() {
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     
     *
     */

    const response = yield call(() => API.get(ROUTES.GET_DATA_MAIN));
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response.data.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_DATA_MAIN_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_DATA_MAIN_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_DATA_MAIN_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_DATA_MAIN` action.
*/
function* GetDataMainSaga() {
  yield takeLatest(Types.GET_DATA_MAIN, GetDataMain);
}

export default GetDataMainSaga;
