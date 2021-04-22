import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import searchForSubjectComponents from '../components/searchForSubject';

import { Creators } from '../redux';
import { Creators as playCreators } from '../../playBook/redux';

const mapStateToProps = (state) => {
  return {
    type: state.searchReducer.type,
    isProcessing: state.searchReducer.isProcessing,
    ageCategory: state.searchReducer.categorySearch,
    subjectCategory: state.searchReducer.subjectCategory,
    dataSearchCategoryVideo: state.searchReducer.dataSearchCategoryVideo,
    totalAudio: state.searchReducer.totalAudio,
    totalPlay: state.searchReducer.totalPlay,
    totalMusic: state.searchReducer.totalMusic,
    dataSearchCategoryMusic: state.searchReducer.dataSearchCategoryMusic,
    dataSearchCategoryAudio: state.searchReducer.dataSearchCategoryAudio,
    tabActiveSubject: state.searchReducer.tabActiveSubject,
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
      getTabActiveSubject: Creators.getTabActiveSubject,
      setStatusPlay: playCreators.setStatusPlay,
      saveTypeReport: playCreators.saveTypeReport,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(searchForSubjectComponents);
