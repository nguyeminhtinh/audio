import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_AUDIO_BOOK_SERIES actions
function* GetDataDetailAudioBook(action) {
  const { groupId, mediaTypeId } = action;
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     
     *
     */

    const response = yield call(() =>
      API.get(ROUTES.GET_AUDIO_BOOK_SERIES(groupId, mediaTypeId))
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response.data.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_AUDIO_BOOK_SERIES_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_AUDIO_BOOK_SERIES_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_AUDIO_BOOK_SERIES_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_AUDIO_BOOK_SERIES` action.
*/
function* GetDataDetailAudioBookSaga() {
  yield takeLatest(Types.GET_AUDIO_BOOK_SERIES, GetDataDetailAudioBook);
}

export default GetDataDetailAudioBookSaga;
