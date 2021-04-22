import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import monthTopicDetailComponents from '../components/monthTopic/detail';

import { Creators } from '../redux';
import { Creators as playCreators } from '../../playBook/redux';

const mapStateToProps = (state) => {
  return {
    type: state.mainReducer.type,
    isProcessing: state.mainReducer.isProcessing,
    dataThemeMonthDetail: state.mainReducer.dataThemeMonthDetail,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getDataThemeMonthDetail: Creators.getDataThemeMonthDetail,
      setAutoPlay: playCreators.setAutoPlay,
      setStatusPlay: playCreators.setStatusPlay,
      saveTypeReport: playCreators.saveTypeReport,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(monthTopicDetailComponents);
