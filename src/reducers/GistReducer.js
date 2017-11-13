import {
  GIST_REQUEST,
  GIST_REQUEST_SUCCESS,
  GIST_REQUEST_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  isLoading: false,
  errors: {},
  gist: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GIST_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case GIST_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        gist: action.payload
      };
    case GIST_REQUEST_ERROR:
      return {
        ...state,
        isFetching: false,
        errors: action.errors
      };
    default:
      return state;
  }
};
