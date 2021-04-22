import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import recordComponent from '../components';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.recordReducer.type,
    isProcessing: state.recordReducer.isProcessing,
    listSubject: state.recordReducer.listSubject,
    listPlayStudio: state.recordReducer.listPlayStudio,
    listRecord: state.recordReducer.listRecord,
    tabActive: state.recordReducer.tabActive,
    isActiveDetail: state.recordReducer.isActiveDetail,
    idActive: state.recordReducer.idActive,
    listSettingUser: state.myPageReducer.listDataCategorySetting,
    infoUser: state.myReducer.infoUser,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListSubject: Creators.getListSubject,
      getListPlayStudio: Creators.getListPlayStudio,
      getListRecord: Creators.getListRecord,
      saveTabActive: Creators.saveTabActive,
      saveIdActive: Creators.saveIdActive,
      setStatusPlayRecord: Creators.setStatusPlayRecord,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(recordComponent);
