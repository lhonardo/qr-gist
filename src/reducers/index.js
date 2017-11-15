import { combineReducers } from 'redux'
import gistReducer from './gistReducer'
import userReducer from './userReducer'
import spinnerReducer from './spinnerReducer'

export default combineReducers({
  gistReducer,
  userReducer,
  spinnerReducer
});
