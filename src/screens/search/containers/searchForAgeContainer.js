import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import searchForAgeComponents from '../components/searchDetail';

import { Creators } from '../redux';
import { Creators as playCreators } from '../../playBook/redux';

const mapStateToProps = (state) => {
  return {
    type: state.searchReducer.type,
    isProcessing: state.searchReducer.isProcessing,
    ageCategorySearch: state.searchReducer.ageCategorySearch,
    subjectCategory: state.searchReducer.subjectCategorySearch,
    dataSearchForAge: state.searchReducer.dataSearchForAge,
    dataSearchCategoryVideo: state.searchReducer.dataSearchCategoryVideo,
    totalAudio: state.searchReducer.totalAudio,
    totalPlay: state.searchReducer.totalPlay,
    totalMusic: state.searchReducer.totalMusic,
    dataSearchCategoryMusic: state.searchReducer.dataSearchCategoryMusic,
    dataSearchCategoryAudio: state.searchReducer.dataSearchCategoryAudio,
    tabActive: state.searchReducer.tabActive,
    pageActive: state.searchReducer.pageActive,
    dataSearchCategorySeries: state.searchReducer.dataSearchCategorySeries,
    totalSeries: state.searchReducer.totalSeries,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      searchCategory: Creators.searchCategory,
      resetData: Creators.resetData,
      setAutoPlay: playCreators.setAutoPlay,
      getTabActive: Creators.getTabActive,
      setStatusPlay: playCreators.setStatusPlay,
      saveTypeReport: playCreators.saveTypeReport,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(searchForAgeComponents);
