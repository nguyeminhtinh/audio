import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import audioBookComponents from '../components';

import { Creators } from '../redux';
import { Creators as searchCreators } from '../../search/redux';

const mapStateToProps = (state) => {
  return {
    type: state.playBookReducer.type,
    isProcessing: state.playBookReducer.isProcessing,
    dataAudioBookDetail: state.playBookReducer.dataAudioBookDetail,
    dataAudioBookSeries: state.playBookReducer.dataAudioBookSeries,
    isProcessingSeries: state.playBookReducer.isProcessingSeries,
    dataPlayerSeries: state.playBookReducer.dataPlayerSeries,
    dataPlayers: state.playBookReducer.dataPlayers,
    likeCount: state.playBookReducer.likeCount,
    avgRate: state.playBookReducer.avgRate,
    listReview: state.playBookReducer.listReview,
    listTypeReport: state.playBookReducer.listTypeReport,
    infoUser: state.myReducer.infoUser,
    typeReport: state.playBookReducer.typeReport,
    listMyReview: state.playBookReducer.listMyReview,
    totalReview: state.playBookReducer.totalReview,
    typeApp: state.mainReducer.typeApp,
    isShowReview: state.playBookReducer.isShowReview,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getDataAudioBook: Creators.getDataAudioBook,
      getAudioBookSeries: Creators.getAudioBookSeries,
      likePlayer: Creators.likePlayer,
      actionLike: Creators.actionLike,
      setStatusPlay: Creators.setStatusPlay,
      getKeySearchDetail: searchCreators.getKeySearchDetail,
      getListReview: Creators.getListReview,
      saveReview: Creators.saveReview,
      getListTypeReport: Creators.getListTypeReport,
      saveReport: Creators.saveReport,
      resetData: Creators.resetData,
      deleteReview: Creators.deleteReview,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(audioBookComponents);
