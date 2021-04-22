import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import eventComponent from '../components/event';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.myPageReducer.type,
    isProcessing: state.myPageReducer.isProcessing,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(eventComponent);
