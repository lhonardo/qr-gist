import Api from '../utils/ApiRequest'
import API_URL from '../constants/api'
import { showSpinner, hideSpinner } from './spinner'
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_ERROR,
  IS_LOGGED,
  LOGOUT
} from './types'

/*
 * REQUEST GIST
 */
export const isLogged = (user) => (dispatch) => {
  return dispatch({
     type: IS_LOGGED,
     payload: user
  })
}

export const login = (token, navigation) => (dispatch) => {
  dispatch(loginRequest())
  return new Api(token, navigation)
      .get(API_URL.USER)
      .then(dispatch(showSpinner()))
      .then(response => {
        if(response.message){
          dispatch(loginError(response.message))
        }else{
          dispatch(loginSuccess(response, token, navigation))
        }
        dispatch(hideSpinner())
      })
      .catch(error => dispatch(loginError(error)))
}

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  }
}

export const loginSuccess = (data, token, navigation) => {
  AsyncStorage.setItem('user', JSON.stringify(data))
  AsyncStorage.setItem('token', token)

  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'gist' })
    ]
  })

  navigation.dispatch(resetAction)

  return {
    type: LOGIN_REQUEST_SUCCESS,
    payload: data
  }
}

export const loginError = (error) => {
  return {
    type: LOGIN_REQUEST_ERROR,
    payload: error
  }
}

export const logout = () => (dispatch) => {
  return dispatch({
     type: LOGOUT
  })
}
