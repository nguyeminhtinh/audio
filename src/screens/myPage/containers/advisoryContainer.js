import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import advisoryComponent from '../components/advisory';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    typeAction: state.myPageReducer.type,
    isProcessing: state.myPageReducer.isProcessing,
    statusCode: state.myPageReducer.statusCode,
    listConsultation: state.myPageReducer.listConsultation,
    totalConsultation: state.myPageReducer.totalConsultation,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListConsultation: Creators.getListConsultation,
      deleteConsultation: Creators.deleteConsultation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(advisoryComponent);
