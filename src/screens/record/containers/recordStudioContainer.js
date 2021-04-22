import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import recordStudioComponent from '../components/recordStudio';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.recordReducer.type,
    isProcessing: state.recordReducer.isProcessing,
    dataDetailRecordStudio: state.recordReducer.dataDetailRecordStudio,
    infoUser: state.myReducer.infoUser,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getDetailRecordStudio: Creators.getDetailRecordStudio,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(recordStudioComponent);
