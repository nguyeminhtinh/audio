import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MonthTopicAnother from '../components/monthTopic/anotherMonth';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.mainReducer.type,
    isProcessing: state.mainReducer.isProcessing,
    dataThemeMonth: state.mainReducer.dataThemeMonth,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getDataThemeMonth: Creators.getDataThemeMonth,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MonthTopicAnother);
