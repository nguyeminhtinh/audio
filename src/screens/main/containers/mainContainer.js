import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import mainComponents from '../components';

import { Creators } from '../redux';
import { Creators as myPageCreators } from '../../myPage/redux';
import { Creators as settingCreators } from '../../settingInterest/redux';
import { Creators as myCreators } from '../../my/redux';
import { Creators as playCreators } from '../../playBook/redux';
import { Creators as searchCreators } from '../../search/redux';

const mapStateToProps = (state) => {
  return {
    type: state.mainReducer.type,
    isProcessing: state.mainReducer.isProcessing,
    dataMain: state.mainReducer.dataMain,
    listKeyAge: state.mainReducer.listKeyAge,
    dataParamSearch: state.settingReducer.dataParamSearch,
    listSettingUser: state.myPageReducer.listDataCategorySetting,
    typeSettingCategory: state.myPageReducer.type,
    code: state.settingReducer.code,
    token: state.settingReducer.token,
    typeCheckUser: state.settingReducer.type,
    isProcessingCheckUser: state.myPageReducer.isProcessing,
    isProcessingGetToken: state.settingReducer.isProcessing,
    activeSlide: state.mainReducer.activeSlide,
    ageCategory: state.myPageReducer.listDataCategorySetting,
    infoUser: state.myReducer.infoUser,
    ageIdMain: state.mainReducer.ageIdMain,
    dataSlideToday: state.mainReducer.dataSlideToday,
    isIndex: state.mainReducer.isIndex,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getDataMain: Creators.getDataMain,
      checkUserAccess: settingCreators.checkUserAccess,
      settingUserCategory: myPageCreators.settingUserCategory,
      resetType: settingCreators.resetType,
      resetData: myPageCreators.resetData,
      setActiveSlide: Creators.setActiveSlide,
      getInformationUser: myCreators.getInformationUser,
      setAutoPlay: playCreators.setAutoPlay,
      setStatusPlay: playCreators.setStatusPlay,
      getKeySearchDetail: searchCreators.getKeySearchDetail,
      saveHistoryBanner: myPageCreators.saveHistoryBanner,
      saveTypeReport: playCreators.saveTypeReport,
      saveTypeApp: Creators.saveTypeApp,
      paymentValidate: Creators.paymentValidate,
      getDataSlideToday: Creators.getDataSlideToday,
      setClassItemLeft: Creators.setClassItemLeft,
      resetActiveTabDetail: Creators.resetActiveTabDetail,
      saveHistorySearch: searchCreators.saveHistorySearch,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(mainComponents);
