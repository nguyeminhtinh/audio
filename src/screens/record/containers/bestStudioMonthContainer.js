import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import bestMonthComponent from '../components/bestStudio';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.recordReducer.type,
    isProcessing: state.recordReducer.isProcessing,
    listStudioMonth: state.recordReducer.listStudioMonth,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListStudioMonth: Creators.getListStudioMonth,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(bestMonthComponent);
