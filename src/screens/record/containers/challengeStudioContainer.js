import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import challengeStudioComponent from '../components/challengeStudio';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.recordReducer.type,
    isProcessing: state.recordReducer.isProcessing,
    listStudioChallenge: state.recordReducer.listStudioChallenge,
    totalStudioChallenge: state.recordReducer.totalStudioChallenge,
    listFilterStudio: state.recordReducer.listFilterStudio,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListStudioChallenge: Creators.getListStudioChallenge,
      resetDataRecord: Creators.resetDataRecord,
      getListFilterStudio: Creators.getListFilterStudio,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(challengeStudioComponent);
