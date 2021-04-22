import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

function* getListDataMy(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() => API.get(ROUTES.API_USER_MY, action.data));
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response.data.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_LIST_MY_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_LIST_MY_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_MY_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_LIST_MY` action.
*/
function* getListDataMySaga() {
  yield takeLatest(Types.GET_LIST_MY, getListDataMy);
}

export default getListDataMySaga;
