import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

function* getListStudioChallenge(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.API_GET_LIST_STUDIO_CHALLENGE, action.data)
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response.data.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_LIST_STUDIO_CHALLENGE_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_LIST_STUDIO_CHALLENGE_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_STUDIO_CHALLENGE_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_LIST__PLAY_STUDIO` action.
*/
function* getListStudioChallengeSaga() {
  yield takeLatest(Types.GET_LIST_STUDIO_CHALLENGE, getListStudioChallenge);
}

export default getListStudioChallengeSaga;
