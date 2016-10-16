import * as actionTypes from '../constants/AuthConstants'

const initialState = {
  type: null,
  user: {
    email: '',
    name: '',
    id: ''
  },
  isLoading: false,
  errors: null,
  formState: {
    username: '',
    password: '',
    rememberMe: false
  }
}

export default function auth(state = initialState, action) {
  const { type, user, errors, formState } = action

  switch (type) {
    case actionTypes.AUTH_LOGIN_REQUESTED:
      return {
        ...state,
        type,
        user: null,
        isLoading: true,
        errors: null
      }

    case actionTypes.AUTH_LOGIN_SUCCEED:
      return {
        ...state,
        type,
        user,
        isLoading: false,
        errors: null
      }

    case actionTypes.AUTH_LOGIN_FAILED:
      return {
        ...state,
        type,
        user: null,
        isLoading: false,
        errors
      }

    case actionTypes.AUTH_RELOGIN_REQUESTED:
      return {
        ...state,
        type,
        isLoading: true,
        errors: null
      }

    case actionTypes.AUTH_RELOGIN_SUCCEED:
      return {
        ...state,
        type,
        user,
        isLoading: false,
        errors: null
      }

    case actionTypes.AUTH_RELOGIN_FAILED:
      return {
        ...state,
        type,
        user: null,
        isLoading: false,
        errors
      }

    case actionTypes.AUTH_LOGGED_OUT:
      return {
        ...state,
        type,
        user: null,
        isLoading: false,
        errors: null
      }

    case actionTypes.AUTH_FORM_CHANGED:
      return {
        ...state,
        type,
        formState: formState
      }

    default:
      return state
  }
}
