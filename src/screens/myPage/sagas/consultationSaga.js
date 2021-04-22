import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_LIST_CONSULTATION actions
function* getListConsultation(action) {
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.API_GET_LIST_CONSULTATION, action.page)
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response?.data?.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_LIST_CONSULTATION_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_LIST_CONSULTATION_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_CONSULTATION_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_LIST_CONSULTATION` action.
*/
function* getListConsultationSaga() {
  yield takeLatest(Types.GET_LIST_CONSULTATION, getListConsultation);
}

export default getListConsultationSaga;
