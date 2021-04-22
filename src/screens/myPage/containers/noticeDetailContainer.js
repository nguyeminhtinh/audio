import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import noticeDetailComponent from '../components/notice/detail';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.myPageReducer.type,
    isProcessing: state.myPageReducer.isProcessing,
    dataAnnouncementDetail: state.myPageReducer.dataAnnouncementDetail,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getAnnouncementDetail: Creators.getAnnouncementDetail,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(noticeDetailComponent);
