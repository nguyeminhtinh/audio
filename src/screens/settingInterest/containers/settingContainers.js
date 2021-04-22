import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import settingInterest from '../components';

import { Creators } from '../redux';
import { Creators as SettingContent } from '../../myPage/redux';

const mapStateToProps = (state) => {
  return {
    type: state.settingReducer.type,
    isProcessing: state.settingReducer.isProcessing,
    ageCategory: state.settingReducer.ageCategory,
    subjectCategory: state.settingReducer.subjectCategory,
    listSetting: state.settingReducer.listSetting,
    listSettingUser: state.settingReducer.listSettingUser,
    userInfo: state.settingReducer.userInfo,
    typeSettingCategory: state.myPageReducer.type,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      settingInterest: SettingContent.settingContentUser,
      getAgeCategory: Creators.getAgeCategory,
      getSubjectCategory: Creators.getSubjectCategory,
      resetType: Creators.resetType,
      resetData: SettingContent.resetData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(settingInterest);
