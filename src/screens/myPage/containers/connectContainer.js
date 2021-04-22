import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import playbookConnect from '../components/connect';

import { Creators } from '../redux';
import { Creators as myCreators } from '../../my/redux';

const mapStateToProps = (state) => {
  return {
    type: state.myPageReducer.type,
    infoUser: state.myReducer.infoUser,
    isProcessing: state.myPageReducer.isProcessing,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      settingWiFi: Creators.settingWiFi,
      getInformationUser: myCreators.getInformationUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(playbookConnect);
