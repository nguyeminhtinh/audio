import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on CHECK_AUDIO_PLAYER_VALID actions
function* checkAudioPlayerValid(action) {
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     
     *
     */

    const response = yield call(() =>
      API.post(ROUTES.API_CHECK_AUDIO_PLAYER_VALID, action.data)
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const { data } = response;
      // In case: setting/ageCategory request success
      yield put({ type: Types.CHECK_AUDIO_PLAYER_VALID_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.CHECK_AUDIO_PLAYER_VALID_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.CHECK_AUDIO_PLAYER_VALID_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `CHECK_AUDIO_PLAYER_VALID` action.
*/
function* checkAudioPlayerValidSaga() {
  yield takeLatest(Types.CHECK_AUDIO_PLAYER_VALID, checkAudioPlayerValid);
}

export default checkAudioPlayerValidSaga;
