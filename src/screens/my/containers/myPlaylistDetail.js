import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import myPlaylistComponent from '../components/playlistDetail';

import { Creators } from '../redux';
import { Creators as recordCreators } from '../../record/redux';
import { Creators as playCreators } from '../../playBook/redux';

const mapStateToProps = (state) => {
  return {
    type: state.recordReducer.type,
    isProcessing: state.recordReducer.isProcessing,
    listPlayStudioDetail: state.recordReducer.listPlayStudioDetail,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListPlayStudioDetail: recordCreators.getListPlayStudioDetail,
      saveTypeReport: playCreators.saveTypeReport,
      setAutoPlay: playCreators.setAutoPlay,
      setStatusPlay: playCreators.setStatusPlay,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(myPlaylistComponent);
