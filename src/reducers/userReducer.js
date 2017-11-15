import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_ERROR,
  IS_LOGGED,
  LOGOUT
} from '../actions/types';

let INITIAL_STATE = {
  isFetching: false,
  isAuthenticated: false,
  error: '',
  user: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload,
        isAuthenticated: true
      };
    case LOGIN_REQUEST_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        isAuthenticated: false
      };
    case IS_LOGGED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        isAuthenticated: false
      };
    default:
      return state;
  }
};
