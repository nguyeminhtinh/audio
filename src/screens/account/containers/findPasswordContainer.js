import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FindPassword from '../components/findPassword';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.accountReducer.type,
    isProcessing: state.accountReducer.isProcessing,
    codeFindPass: state.accountReducer.codeFindPass,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      findPassword: Creators.findPassword,
      resetData: Creators.resetData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FindPassword);
