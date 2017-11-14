import { SHOW_SPINNER, HIDE_SPINNER } from '../actions/spinner'

const defaultState = {
  visible: false
}

const spinner = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_SPINNER:
      return { ...state, visible: true }

    case HIDE_SPINNER:
      return { ...state, visible: false }

    default:
      return state
  }
}

export default spinner
