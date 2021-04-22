import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import strawberryBeansComponents from '../components/strawberryBeans';

import { Creators } from '../redux';
import { Creators as playCreators } from '../../playBook/redux';

const mapStateToProps = (state) => {
  return {
    type: state.mainReducer.type,
    isProcessing: state.mainReducer.isProcessing,
    dataThemeLikeThis: state.mainReducer.dataThemeLikeThis,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getDataThemeLikeThis: Creators.getDataThemeLikeThis,
      setAutoPlay: playCreators.setAutoPlay,
      setStatusPlay: playCreators.setStatusPlay,
      saveTypeReport: playCreators.saveTypeReport,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(strawberryBeansComponents);
