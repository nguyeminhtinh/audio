import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import noticeComponent from '../components/notice';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.myPageReducer.type,
    isProcessing: state.myPageReducer.isProcessing,
    dataAnnouncementHistory: state.myPageReducer.dataAnnouncementHistory,
    totalAnnouncement: state.myPageReducer.totalAnnouncement,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getAnnouncementHistory: Creators.getAnnouncementHistory,
      resetData: Creators.resetData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(noticeComponent);
