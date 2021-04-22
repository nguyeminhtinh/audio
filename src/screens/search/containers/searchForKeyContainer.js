import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import searchForKeyComponents from '../components/searchForKey';

import { Creators } from '../redux';
import { Creators as playCreators } from '../../playBook/redux';

const mapStateToProps = (state) => {
  return {
    type: state.searchReducer.type,
    isProcessing: state.searchReducer.isProcessing,
    ageCategorySearch: state.settingReducer.ageCategorySearch,
    subjectCategory: state.settingReducer.subjectCategory,
    dataSearchCategoryVideo: state.searchReducer.dataSearchCategoryVideo,
    totalAudio: state.searchReducer.totalAudio,
    totalPlay: state.searchReducer.totalPlay,
    totalMusic: state.searchReducer.totalMusic,
    dataSearchCategoryMusic: state.searchReducer.dataSearchCategoryMusic,
    dataSearchCategoryAudio: state.searchReducer.dataSearchCategoryAudio,
    keySearchDetail: state.searchReducer.keySearchDetail,
    ataSearchCategorySeries: state.searchReducer.dataSearchCategorySeries,
    totalSeries: state.searchReducer.totalSeries,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      searchKeywordDetail: Creators.searchKeywordDetail,
      resetData: Creators.resetData,
      setAutoPlay: playCreators.setAutoPlay,
      setStatusPlay: playCreators.setStatusPlay,
      saveTypeReport: playCreators.saveTypeReport,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(searchForKeyComponents);
