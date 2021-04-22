import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormSignUpSns from '../components/signUp/formSignUpSns';

import { Creators } from '../redux';
import { Creators as settingCreators } from '../../settingInterest/redux';
import { Creators as myCreators } from '../../my/redux';

const mapStateToProps = (state) => {
  return {
    type: state.accountReducer.type,
    isProcessing: state.accountReducer.isProcessing,
    codeCheckEmail: state.accountReducer.codeCheckEmail,
    seqNo: state.accountReducer.seqNo,
    codeSignIn: state.accountReducer.codeSignIn,
    token: state.settingReducer.token,
    typeCheckUser: state.settingReducer.type,
    code: state.settingReducer.code,
    infoUser: state.myReducer.infoUser,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      signUp: Creators.signUp,
      checkEmail: Creators.checkEmail,
      resetData: Creators.resetData,
      checkUserAccess: settingCreators.checkUserAccess,
      signInKakao: Creators.signInKakao,
      signInNaver: Creators.signInNaver,
      signInApple: Creators.signInApple,
      getInformationUser: myCreators.getInformationUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FormSignUpSns);
