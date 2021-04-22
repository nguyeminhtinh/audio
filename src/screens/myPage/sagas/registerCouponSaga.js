import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types as CommonTypes } from '../../../commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on REGISTER_COUPON actions
function* registerCoupon(action) {
  try {
    /**
     * Example data
     * url: enpoint/setting/ageCategory
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_REGISTER_COUPON, action.data)
    );
    if (response.status === 500) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }
    if (response.ok) {
      const data = response?.data?.body;
      // In case: setting/ageCategory request success
      yield put({ type: Types.REGISTER_COUPON_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.REGISTER_COUPON_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.REGISTER_COUPON_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `REGISTER_COUPON` action.
*/
function* registerCouponSaga() {
  yield takeLatest(Types.REGISTER_COUPON, registerCoupon);
}

export default registerCouponSaga;
