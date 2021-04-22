import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import myPageComponent from '../components';

import { Creators } from '../redux';
import { Creators as settingCreators } from '../../settingInterest/redux';
import { Creators as myCreators } from '../../my/redux';

const mapStateToProps = (state) => {
  return {
    type: state.myPageReducer.type,
    isProcessing: state.myPageReducer.isProcessing,
    infoUser: state.myReducer.infoUser,
    typeLogin: state.accountReducer.typeLogin,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      logout: settingCreators.logout,
      handlePush: Creators.handlePush,
      getInformationUser: myCreators.getInformationUser,
      registerHistoryPage: Creators.registerHistoryPage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(myPageComponent);
