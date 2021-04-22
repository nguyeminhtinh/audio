import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import strawBerryBeansSchoolComponents from '../components/strawberryBeanSchool/detail';

import { Creators } from '../redux';
import { Creators as SettingInterest } from '../../settingInterest/redux';
import { Creators as playCreators } from '../../playBook/redux';

const mapStateToProps = (state) => {
  return {
    type: state.mainReducer.type,
    isProcessing: state.mainReducer.isProcessing,
    dataThemeSchool: state.mainReducer.dataThemeSchool,
    ageCategory: state.settingReducer.ageCategory,
    ageIdMain: state.mainReducer.ageIdMain,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getDataThemeSchool: Creators.getDataThemeSchool,
      getAgeCategory: SettingInterest.getAgeCategory,
      setAutoPlay: playCreators.setAutoPlay,
      setStatusPlay: playCreators.setStatusPlay,
      saveTypeReport: playCreators.saveTypeReport,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(strawBerryBeansSchoolComponents);
