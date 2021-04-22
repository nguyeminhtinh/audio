import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import bestFriendsComponents from '../components/bestFriends/detail';

import { Creators } from '../redux';
import { Creators as SettingInterest } from '../../settingInterest/redux';
import { Creators as playCreators } from '../../playBook/redux';

const mapStateToProps = (state) => {
  return {
    type: state.mainReducer.type,
    isProcessing: state.mainReducer.isProcessing,
    ageCategory: state.settingReducer.ageCategory,
    dataBestFriend: state.mainReducer.dataBestFriend,
    ageIdMain: state.mainReducer.ageIdMain,
    valActiveTab: state.mainReducer.valActiveTab,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getDataBestFriend: Creators.getDataBestFriend,
      getAgeCategory: SettingInterest.getAgeCategory,
      setAutoPlay: playCreators.setAutoPlay,
      setStatusPlay: playCreators.setStatusPlay,
      saveTypeReport: playCreators.saveTypeReport,
      saveActiveTabDetail: Creators.saveActiveTabDetail,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(bestFriendsComponents);
