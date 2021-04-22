import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditInfoContainer from '../components/infoUser';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.myPageReducer.type,
    infoUser: state.myReducer.infoUser,
    errors: state.myPageReducer.errors,
    codeStatus: state.myPageReducer.codeStatus,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      updatePassword: Creators.updatePassword,
      updatePhone: Creators.updatePhone,
      resetData: Creators.resetData,
      registerHistoryPage: Creators.registerHistoryPage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EditInfoContainer);
