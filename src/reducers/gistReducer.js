import {
  GIST_REQUEST,
  GIST_REQUEST_SUCCESS,
  GIST_REQUEST_ERROR,
  GIST_COMMENTS_REQUEST,
  GIST_COMMENTS_REQUEST_SUCCESS,
  GIST_COMMENTS_REQUEST_ERROR,
  SEND_COMMENT_REQUEST,
  SEND_COMMENT_REQUEST_SUCCESS,
  SEND_COMMENT_REQUEST_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: false,
  errors: {},
  gist: {},
  comments: []
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
        errors: action.payload
      };
    case GIST_COMMENTS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case GIST_COMMENTS_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        comments: action.payload
      };
    case GIST_COMMENTS_REQUEST_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case SEND_COMMENT_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case SEND_COMMENT_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case SEND_COMMENT_REQUEST_ERROR:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
