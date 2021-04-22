import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import searchComponents from '../components';

import { Creators } from '../redux';
import { Creators as playCreators } from '../../playBook/redux';

const mapStateToProps = (state) => {
  return {
    type: state.searchReducer.type,
    isProcessing: state.searchReducer.isProcessing,
    isProcessingSearch: state.searchReducer.isProcessingSearch,
    listAudioBookAutoComplete: state.searchReducer.listAudioBookAutoComplete,
    listPlayBookAutoComplete: state.searchReducer.listPlayBookAutoComplete,
    listMusicAutoComplete: state.searchReducer.listMusicAutoComplete,
    dataSearchDetail: state.searchReducer.dataSearchDetail,
    listCondition: state.searchReducer.listCondition,
    subjectCategory: state.searchReducer.subjectCategory,
    topKeywords: state.searchReducer.topKeywords,
    ageCategorySearch: state.searchReducer.ageCategorySearch,
    dataSearchCategoryVideo: state.searchReducer.dataSearchCategoryVideo,
    totalAudio: state.searchReducer.totalAudio,
    totalPlay: state.searchReducer.totalPlay,
    totalMusic: state.searchReducer.totalMusic,
    dataSearchCategoryMusic: state.searchReducer.dataSearchCategoryMusic,
    dataSearchCategoryAudio: state.searchReducer.dataSearchCategoryAudio,
    pageActive: state.searchReducer.pageActive,
    keySearchPre: state.searchReducer.keySearch,
    dataSearchEmpty: state.searchReducer.dataSearchEmpty,
    listSeriesAutoComplete: state.searchReducer.listSeriesAutoComplete,
    totalSeries: state.searchReducer.totalSeries,
    dataSearchCategorySeries: state.searchReducer.dataSearchCategorySeries,
    listSettingUser: state.myPageReducer.listDataCategorySetting,
    infoUser: state.myReducer.infoUser,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getKeySearchAutoComplete: Creators.getKeySearchAutoComplete,
      getDataSearchDetail: Creators.getDataSearchDetail,
      getCondition: Creators.getCondition,
      resetData: Creators.resetData,
      getPage: Creators.getPage,
      setAutoPlay: playCreators.setAutoPlay,
      getTabActive: Creators.getTabActive,
      getTabActiveSubject: Creators.getTabActiveSubject,
      getKeySearch: Creators.getKeySearch,
      setStatusPlay: playCreators.setStatusPlay,
      saveTypeReport: playCreators.saveTypeReport,
      saveHistorySearchDetail: Creators.saveHistorySearchDetail,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(searchComponents);
