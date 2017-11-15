import Api from '../utils/ApiRequest'
import API_URL from '../constants/api'
import { showSpinner, hideSpinner } from './spinner'

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
} from './types'

/*
 * REQUEST GIST
 */
export const fetchGist = (gistId) => (dispatch) => {
  dispatch(fetchGistRequest())

  return new Api()
      .get(API_URL.GISTS + gistId)
      .then(dispatch(showSpinner()))
      .then(response => {
        dispatch(fetchGistSuccess(response, dispatch, gistId))
        dispatch(hideSpinner())
      })
      .catch(error => dispatch(fetchGistError(error)))
}

export const fetchGistRequest = () => {
  return {
    type: GIST_REQUEST
  }
}

export const fetchGistSuccess = (data, dipatch, id) => {
  if (data.comments){
    dipatch(fetchGistComments(id))
  }
  return {
    type: GIST_REQUEST_SUCCESS,
    payload: data
  }
}

export const fetchGistError = (error) => {
  return {
    type: GIST_REQUEST_ERROR,
    payload: error
  }
}

/*
 * REQUEST GIST COMMENTS
 */
export const fetchGistComments = (gistId) => (dispatch) => {
  dispatch(fetchGistCommentsRequest())

  return new Api()
      .get(API_URL.GISTS + gistId + '/comments')
      .then(dispatch(showSpinner()))
      .then(response => {
        dispatch(fetchGistCommentsSuccess(response))
        dispatch(hideSpinner())
      })
      .catch(error => dispatch(fetchGistCommentsError(error)))
}

export const fetchGistCommentsRequest = () => {
  return {
    type: GIST_COMMENTS_REQUEST
  }
}

export const fetchGistCommentsSuccess = (data) => {
  return {
    type: GIST_COMMENTS_REQUEST_SUCCESS,
    payload: data
  }
}

export const fetchGistCommentsError = (error) => {
  return {
    type: GIST_COMMENTS_REQUEST_ERROR,
    payload: error
  }
}

/*
 * SEND GIST COMMENT
 */
export const sendComment = (gistId, token, comment) => (dispatch) => {
  dispatch(sendCommentRequest())

  const body = {
    body: comment
  }

  return new Api(token)
    .post(API_URL.GISTS + gistId + '/comments', body)
    .then(dispatch(showSpinner()))
    .then(response => {
      dispatch(sendCommentSuccess(response.data, dispatch, gistId))
      dispatch(hideSpinner())
    })
    .catch(error => {
      dispatch(sendCommentError(error))
      dispatch(hideSpinner())
    })
}

export const sendCommentRequest = () => {
  return {
    type: SEND_COMMENT_REQUEST
  }
}

export const sendCommentSuccess = (data, dispatch, gistId) => {
  dispatch(fetchGistComments(gistId))
  return {
    type: SEND_COMMENT_REQUEST_SUCCESS,
    payload: data
  }
}

export const sendCommentError = (error) => {
  return {
    type: SEND_COMMENT_REQUEST_ERROR,
    payload: error
  }
}
