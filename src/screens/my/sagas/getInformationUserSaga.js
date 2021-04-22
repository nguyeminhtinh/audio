import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

function* getInformationUser() {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() => API.get(ROUTES.API_GET_INFORMATION_USER));
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response.data.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_INFORMATION_USER_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_INFORMATION_USER_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_INFORMATION_USER_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_INFORMATION_USER` action.
*/
function* getInformationUserSaga() {
  yield takeLatest(Types.GET_INFORMATION_USER, getInformationUser);
}

export default getInformationUserSaga;
