import { combineReducers } from 'redux';
import { settingReducer } from 'screens/settingInterest/redux';
import { myPageReducer } from 'screens/myPage/redux';
import { searchReducer } from 'screens/search/redux';
import { mainReducer } from 'screens/main/redux';
import { playBookReducer } from 'screens/playBook/redux';
import { myReducer } from 'screens/my/redux';
import { accountReducer } from 'screens/account/redux';
import { recordReducer } from 'screens/record/redux';

const appReducer = combineReducers({
  settingReducer,
  myPageReducer,
  searchReducer,
  mainReducer,
  playBookReducer,
  myReducer,
  accountReducer,
  recordReducer,
});

export default appReducer;
