import { combineReducers } from 'redux';
import GistReducer from './GistReducer';

export default combineReducers({
  gist: GistReducer
});
