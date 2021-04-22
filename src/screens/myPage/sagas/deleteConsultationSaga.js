import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on DELETE_LIST_IMAGE_PRODUCT actions
function* deleteConsultation(action) {
  try {
    /**
     * Example data
     * url: enpoint/members
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.DELETE_CONSULTATION_API, JSON.stringify(action.listQnaId))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      const { data } = response;
      yield put({
        type: Types.DELETE_CONSULTATION_SUCCESS,
        data: { listQnaId: action.listQnaId, dataBody: data },
      });
    } else {
      // In case: request failed
      const { data } = response;
      yield put({
        type: Types.DELETE_CONSULTATION_FAILED,
        data,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.DELETE_CONSULTATION_FAILED, error });
  }
}

/*
  Starts DELETE revenues list on each dispatched `DELETE_LIST_IMAGE_PRODUCT` action.
*/
function* deleteConsultationSaga() {
  yield takeLatest(Types.DELETE_CONSULTATION, deleteConsultation);
}

export default deleteConsultationSaga;
