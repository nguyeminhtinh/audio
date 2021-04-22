import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_DATA_BEST_FRIEND actions
function* GetDataBestFriend(action) {
  const ageCategoryId = action.id;
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     
     *
     */

    const response = yield call(() =>
      API.get(ROUTES.GET_DATA_BEST_FRIEND(ageCategoryId))
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response.data.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_DATA_BEST_FRIEND_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_DATA_BEST_FRIEND_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_DATA_BEST_FRIEND_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_DATA_BEST_FRIEND` action.
*/
function* GetDataBestFriendSaga() {
  yield takeLatest(Types.GET_DATA_BEST_FRIEND, GetDataBestFriend);
}

export default GetDataBestFriendSaga;
