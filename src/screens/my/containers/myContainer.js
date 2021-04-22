import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import myComponent from '../components';

import { Creators } from '../redux';
import { Creators as playCreators } from '../../playBook/redux';
import { Creators as recordCreators } from '../../record/redux';

const mapStateToProps = (state) => {
  return {
    type: state.myReducer.type,
    isProcessing: state.myReducer.isProcessing,
    listDataUserPlay: state.myReducer.listDataUserPlay,
    tabActive: state.myReducer.tabActive,
    infoUser: state.myReducer.infoUser,
    isProcessingChangeAvatar: state.myReducer.isProcessingChangeAvatar,
    totalAudio: state.myReducer.totalAudio,
    totalPlay: state.myReducer.totalPlay,
    totalMusic: state.myReducer.totalMusic,
    dataCategoryMusic: state.myReducer.dataCategoryMusic,
    dataCategoryAudio: state.myReducer.dataCategoryAudio,
    dataCategoryVideo: state.myReducer.dataCategoryVideo,
    dataRecordUser: state.myReducer.dataRecordUser,
    totalRecord: state.myReducer.totalRecord,
    isShowPopupStudio: state.myReducer.isShowPopupStudio,
    isShowPopupPlaylist: state.myReducer.isShowPopupPlaylist,
    studioSelected: state.myReducer.studioSelected,
    listSettingUser: state.myPageReducer.listDataCategorySetting,
    dataPlaylist: state.myReducer.dataPlaylist,
    totalGroup: state.myReducer.totalGroup,
    typeApp: state.mainReducer.typeApp,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListMy: Creators.getListMy,
      activeTabMy: Creators.activeTabMy,
      getInformationUser: Creators.getInformationUser,
      setAutoPlay: playCreators.setAutoPlay,
      updateAvatar: Creators.updateAvatar,
      setStatusPlay: playCreators.setStatusPlay,
      resetDataMy: Creators.resetDataMy,
      saveTypeReport: playCreators.saveTypeReport,
      getListRecordUser: Creators.getListRecordUser,
      showPopupStudio: Creators.showPopupStudio,
      hiddenPopupStudio: Creators.hiddenPopupStudio,
      updateStudio: Creators.updateStudio,
      deleteStudio: Creators.deleteStudio,
      showPopupPlaylist: Creators.showPopupPlaylist,
      hiddenPopupPlaylist: Creators.hiddenPopupPlaylist,
      getDataStudio: Creators.getDataStudio,
      getListPlaylist: Creators.getListPlaylist,
      setStatusPlayRecord: recordCreators.setStatusPlayRecord,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(myComponent);
