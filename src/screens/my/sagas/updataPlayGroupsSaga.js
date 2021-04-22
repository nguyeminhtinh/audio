import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

function* updatePlayGroup(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_SAVE_PLAY_GROUP, action.data)
    );

    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response.data.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.UPDATE_PLAY_GROUP_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.UPDATE_PLAY_GROUP_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.UPDATE_PLAY_GROUP_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `UPDATE_PLAY_GROUP` action.
*/
function* updatePlayGroupSaga() {
  yield takeLatest(Types.UPDATE_PLAY_GROUP, updatePlayGroup);
}

export default updatePlayGroupSaga;
