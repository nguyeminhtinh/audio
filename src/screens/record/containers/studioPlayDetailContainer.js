import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import playStudioDetailComponent from '../components/studioDetail';

import { Creators } from '../redux';
import { Creators as playCreators } from '../../playBook/redux';

const mapStateToProps = (state) => {
  return {
    type: state.recordReducer.type,
    isProcessing: state.recordReducer.isProcessing,
    dataDetailPlayStudio: state.recordReducer.dataDetailPlayStudio,
    likeCount: state.recordReducer.likeCount,
    avgRate: state.recordReducer.avgRate,
    listReview: state.recordReducer.listReview,
    listMyReview: state.recordReducer.listMyReview,
    totalReview: state.recordReducer.totalReview,
    infoUser: state.myReducer.infoUser,
    listTypeReport: state.playBookReducer.listTypeReport,
    listSeriesStudio: state.recordReducer.listSeriesStudio,
    isShowReviewStudio: state.recordReducer.isShowReviewStudio,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getDetailPlayStudio: Creators.getDetailPlayStudio,
      saveTypeReport: playCreators.saveTypeReport,
      setAutoPlay: playCreators.setAutoPlay,
      setStatusPlayRecord: Creators.setStatusPlayRecord,
      getListReviewStudio: Creators.getListReviewStudio,
      saveReviewStudio: Creators.saveReviewStudio,
      resetDataRecord: Creators.resetDataRecord,
      getListTypeReport: playCreators.getListTypeReport,
      deleteReviewStudio: Creators.deleteReviewStudio,
      saveReport: playCreators.saveReport,
      likeDetailStudio: Creators.likeDetailStudio,
      actionLike: Creators.actionLike,
      getListSeriesStudio: Creators.getListSeriesStudio,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(playStudioDetailComponent);
