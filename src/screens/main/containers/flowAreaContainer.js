import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlowAreaComponents from '../components/flowArea';

import { Creators } from '../redux';
import { Creators as playCreators } from '../../playBook/redux';

const mapStateToProps = (state) => {
  return {
    type: state.mainReducer.type,
    isProcessing: state.mainReducer.isProcessing,
    dataThemeCharacterDetail: state.mainReducer.dataThemeCharacterDetail,
    dataThemeDefaultDetail: state.mainReducer.dataThemeDefaultDetail,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getDataThemeCharacterDetail: Creators.getDataThemeCharacterDetail,
      setAutoPlay: playCreators.setAutoPlay,
      setStatusPlay: playCreators.setStatusPlay,
      saveTypeReport: playCreators.saveTypeReport,
      getDataThemeBanner: Creators.getDataThemeBanner,
      getDataThemeDefault: Creators.getDataThemeDefault,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FlowAreaComponents);
