import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

function* getDetailPlayStudio(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.API_GET_DETAIL_PLAY_STUDIO(action.id))
    );

    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response.data.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_DETAIL_PLAY_STUDIO_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_DETAIL_PLAY_STUDIO_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_DETAIL_PLAY_STUDIO_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_LIST__PLAY_STUDIO` action.
*/
function* getDetailPlayStudioSaga() {
  yield takeLatest(Types.GET_DETAIL_PLAY_STUDIO, getDetailPlayStudio);
}

export default getDetailPlayStudioSaga;
