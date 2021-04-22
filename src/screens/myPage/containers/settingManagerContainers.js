import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import settingManger from '../components/settingManager';

import { Creators } from '../redux';
import { Creators as SettingInterest } from '../../settingInterest/redux';

const mapStateToProps = (state) => {
  return {
    type: state.myPageReducer.type,
    isProcessing: state.myPageReducer.isProcessing,
    ageCategory: state.settingReducer.ageCategory,
    subjectCategory: state.settingReducer.subjectCategory,
    listSetting: state.myPageReducer.listDataCategorySetting,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      settingInterest: SettingInterest.settingInterest,
      resetType: SettingInterest.resetType,
      settingUserCategory: Creators.settingUserCategory,
      settingContentUser: Creators.settingContentUser,
      getAgeCategory: SettingInterest.getAgeCategory,
      getSubjectCategory: SettingInterest.getSubjectCategory,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(settingManger);
