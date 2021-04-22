import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignUp from '../components/signUp';

import { Creators } from '../redux';
import { Creators as settingCreators } from '../../settingInterest/redux';
import { Creators as myPageCreators } from '../../myPage/redux';

const mapStateToProps = (state) => {
  return {
    type: state.accountReducer.type,
    isProcessing: state.accountReducer.isProcessing,
    errorServer: state.accountReducer.errorServer,
    codeSignIn: state.accountReducer.codeSignIn,
    seqNo: state.accountReducer.seqNo,
    code: state.settingReducer.code,
    token: state.settingReducer.token,
    typeCheckUser: state.settingReducer.type,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      signIn: Creators.signIn,
      handleResetAccountState: Creators.handleResetAccountState,
      resetData: Creators.resetData,
      checkUserAccess: settingCreators.checkUserAccess,
      settingUserCategory: myPageCreators.settingUserCategory,
      signInFacebook: Creators.signInFacebook,
      signInKakao: Creators.signInKakao,
      signInNaver: Creators.signInNaver,
      getTypeLogin: Creators.getTypeLogin,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
