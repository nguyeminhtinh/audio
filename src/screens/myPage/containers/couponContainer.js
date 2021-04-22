import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CouponContainer from '../components/coupon';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.myPageReducer.type,
    codeRegisterCoupon: state.myPageReducer.codeRegisterCoupon,
    isProcessing: state.myPageReducer.isProcessing,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      registerCoupon: Creators.registerCoupon,
      resetData: Creators.resetData,
      registerHistoryPage: Creators.registerHistoryPage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CouponContainer);
