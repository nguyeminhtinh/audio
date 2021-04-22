import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import advisoryUpdateComponent from '../components/advisory/edit';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    typeAction: state.myPageReducer.type,
    isProcessing: state.myPageReducer.isProcessing,
    statusCode: state.myPageReducer.statusCode,
    dataDetailConsultation: state.myPageReducer.dataDetailConsultation,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getDetailConsultation: Creators.getDetailConsultation,
      consultationSave: Creators.consultationSave,
      saveFile: Creators.saveFile,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(advisoryUpdateComponent);
