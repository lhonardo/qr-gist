import Api from '../utils/ApiRequest'
import API_URL from '../constants/api'
import { showSpinner, hideSpinner } from './spinner'

import {
  GIST_REQUEST,
  GIST_REQUEST_SUCCESS,
  GIST_REQUEST_ERROR
} from './types'

/*
 * REQUEST GIST
 */
export const fetchGist = (gistId) => (dispatch) => {
  dispatch(fetchGistRequest())

  return new Api()
      .get(API_URL.URL, '0409658c1d18a60281a5cb2309bf421b')
      .then(dispatch(showSpinner()))
      .then(response => {
        dispatch(fetchGistSuccess(response))
        dispatch(hideSpinner())
      })
      .catch(error => dispatch(fetchGistError(error)))
}

export const fetchGistRequest = () => {
  return {
    type: GIST_REQUEST
  }
}

export const fetchGistSuccess = (data) => {
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
