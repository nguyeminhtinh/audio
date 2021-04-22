import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import advisoryRegisterComponent from '../components/advisory/register';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    typeAction: state.myPageReducer.type,
    statusCode: state.myPageReducer.statusCode,
    isProcessing: state.myPageReducer.isProcessing,
    qnaId: state.myPageReducer.qnaId,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      consultationSave: Creators.consultationSave,
      saveFile: Creators.saveFile,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(advisoryRegisterComponent);
