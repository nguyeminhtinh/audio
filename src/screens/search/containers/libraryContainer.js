import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import libraryComponents from '../components/library';

import { Creators } from '../redux';
import { Creators as playCreators } from '../../playBook/redux';
import { Creators as SettingInterest } from '../../settingInterest/redux';

const mapStateToProps = (state) => {
  return {
    type: state.searchReducer.type,
    isProcessing: state.searchReducer.isProcessing,
    ageCategory: state.settingReducer.ageCategory,
    dataSearchCategoryVideo: state.searchReducer.dataSearchCategoryVideo,
    totalAudio: state.searchReducer.totalAudio,
    totalPlay: state.searchReducer.totalPlay,
    totalMusic: state.searchReducer.totalMusic,
    dataSearchCategoryMusic: state.searchReducer.dataSearchCategoryMusic,
    dataSearchCategoryAudio: state.searchReducer.dataSearchCategoryAudio,
    tabActiveSubject: state.searchReducer.tabActiveSubject,
    dataSearchCategorySeries: state.searchReducer.dataSearchCategorySeries,
    totalSeries: state.searchReducer.totalSeries,
    tabActiveSeries: state.searchReducer.tabActiveSeries,
    ageIdMain: state.mainReducer.ageIdMain,
    listSettingUser: state.myPageReducer.listDataCategorySetting,
    infoUser: state.myReducer.infoUser,
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
      getLibrary: Creators.getLibrary,
      getAgeCategory: SettingInterest.getAgeCategory,
      getTabActiveSeries: Creators.getTabActiveSeries,
      saveTypeReport: playCreators.saveTypeReport,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(libraryComponents);
