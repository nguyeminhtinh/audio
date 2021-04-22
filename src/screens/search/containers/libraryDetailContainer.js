import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import libraryComponents from '../components/library/detail';

import { Creators } from '../redux';
import { Creators as playCreators } from '../../playBook/redux';

const mapStateToProps = (state) => {
  return {
    type: state.searchReducer.type,
    isProcessing: state.searchReducer.isProcessing,
    dataLibraryDetail: state.searchReducer.dataLibraryDetail,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getLibraryDetail: Creators.getLibraryDetail,
      setAutoPlay: playCreators.setAutoPlay,
      setStatusPlay: playCreators.setStatusPlay,
      saveTypeReport: playCreators.saveTypeReport,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(libraryComponents);
