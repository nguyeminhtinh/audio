import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

function* paymentValidate() {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() => API.get(ROUTES.API_PAYMENT_VALIDATE));
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response.data.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.PAYMENT_VALIDATE_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.PAYMENT_VALIDATE_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.PAYMENT_VALIDATE_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `PAYMENT_VALIDATE` action.
*/
function* paymentValidateSaga() {
  yield takeLatest(Types.PAYMENT_VALIDATE, paymentValidate);
}

export default paymentValidateSaga;
