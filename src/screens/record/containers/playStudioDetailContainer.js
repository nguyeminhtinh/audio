import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import playStudioComponent from '../components/playStudioDetail';

import { Creators } from '../redux';
import { Creators as playCreators } from '../../playBook/redux';

const mapStateToProps = (state) => {
  return {
    type: state.recordReducer.type,
    isProcessing: state.recordReducer.isProcessing,
    listPlayStudioDetail: state.recordReducer.listPlayStudioDetail,
    likeCount: state.recordReducer.likeCount,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListPlayStudioDetail: Creators.getListPlayStudioDetail,
      saveTypeReport: playCreators.saveTypeReport,
      setAutoPlay: playCreators.setAutoPlay,
      setStatusPlay: playCreators.setStatusPlay,
      likeStudio: Creators.likeStudio,
      actionLike: Creators.actionLike,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(playStudioComponent);
