import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import myPlaylist from '../components/myPlayList/myPlaylist';

import { Creators } from '../redux';
import { Creators as recordCreators } from '../../record/redux';

const mapStateToProps = (state) => {
  return {
    type: state.myReducer.type,
    isProcessing: state.myReducer.isProcessing,
    dataPlaylist: state.myReducer.dataPlaylist,
    totalGroup: state.myReducer.totalGroup,
    listSubject: state.recordReducer.listSubject,
    studioPlaySubject: state.myReducer.studioPlaySubject,
    infoUser: state.myReducer.infoUser,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListPlaylist: Creators.getListPlaylist,
      getListSubject: recordCreators.getListSubject,
      updatePlayGroup: Creators.updatePlayGroup,
      deleteGroupStudio: Creators.deleteGroupStudio,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(myPlaylist);
