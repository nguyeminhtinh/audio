import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormSignUp from '../components/signUp/formSignUp';

import { Creators } from '../redux';
import { Creators as settingCreators } from '../../settingInterest/redux';

const mapStateToProps = (state) => {
  return {
    type: state.accountReducer.type,
    isProcessing: state.accountReducer.isProcessing,
    seqNo: state.accountReducer.seqNo,
    codeSignIn: state.accountReducer.codeSignIn,
    token: state.settingReducer.token,
    typeCheckUser: state.settingReducer.type,
    code: state.settingReducer.code,
    codeCheckEmail: state.accountReducer.codeCheckEmail,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      signUp: Creators.signUp,
      resetData: Creators.resetData,
      checkUserAccess: settingCreators.checkUserAccess,
      checkEmail: Creators.checkEmail,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FormSignUp);
