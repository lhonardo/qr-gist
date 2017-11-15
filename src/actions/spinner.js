import { SHOW_SPINNER, HIDE_SPINNER } from './types'

export const showSpinner = () => {
  return { type: SHOW_SPINNER }
}

export const hideSpinner = () => {
  return { type: HIDE_SPINNER }
}
