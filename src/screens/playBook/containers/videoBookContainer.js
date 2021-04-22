import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import videoBookComponents from '../components/video';

import { Creators } from '../redux';
import { Creators as searchCreators } from '../../search/redux';

const mapStateToProps = (state) => {
  return {
    type: state.playBookReducer.type,
    isProcessing: state.playBookReducer.isProcessing,
    dataAudioBookDetail: state.playBookReducer.dataAudioBookDetail,
    dataAudioBookSeries: state.playBookReducer.dataAudioBookSeries,
    isProcessingSeries: state.playBookReducer.isProcessingSeries,
    autoPlay: state.playBookReducer.autoPlay,
    likeCount: state.playBookReducer.likeCount,
    contentsVideoUrl: state.playBookReducer.contentsUrl,
    statusVideo: state.playBookReducer.statusVideo,
    avgRate: state.playBookReducer.avgRate,
    listReview: state.playBookReducer.listReview,
    listTypeReport: state.playBookReducer.listTypeReport,
    infoUser: state.myReducer.infoUser,
    typeReport: state.playBookReducer.typeReport,
    listMyReview: state.playBookReducer.listMyReview,
    totalReview: state.playBookReducer.totalReview,
    typeApp: state.mainReducer.typeApp,
    dataDetailVideo: state.playBookReducer.dataDetailVideo,
    isShowReview: state.playBookReducer.isShowReview,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getDataAudioBook: Creators.getDataAudioBook,
      setStatusPlay: Creators.setStatusPlay,
      likePlayer: Creators.likePlayer,
      actionLike: Creators.actionLike,
      getContentVideo: Creators.getContentVideo,
      setAutoPlay: Creators.setAutoPlay,
      getKeySearchDetail: searchCreators.getKeySearchDetail,
      checkPlay: Creators.checkPlay,
      getListReview: Creators.getListReview,
      saveReview: Creators.saveReview,
      getListTypeReport: Creators.getListTypeReport,
      resetData: Creators.resetData,
      saveReport: Creators.saveReport,
      deleteReview: Creators.deleteReview,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(videoBookComponents);
