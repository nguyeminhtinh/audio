import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on UPDATE_PASSWORD actions
function* updatePassword(action) {
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_UPDATE_PASSWORD, action.data)
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response?.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.UPDATE_PASSWORD_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.UPDATE_PASSWORD_FAILED,
        errors: response.data.data.message && response.data.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.UPDATE_PASSWORD_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `UPDATE_PASSWORD` action.
*/
function* updatePasswordSaga() {
  yield takeLatest(Types.UPDATE_PASSWORD, updatePassword);
}

export default updatePasswordSaga;
