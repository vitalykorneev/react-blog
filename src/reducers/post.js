import * as actionTypes from '../constants/PostConstants'

const initialState = {
  title: '',
  content: ''
}

export default function post(state = initialState, action) {
  const { type, data } = action
  const key = data ? Object.keys(data)[0] : ''

  switch (type) {
    case actionTypes.ADD_POST:
      return state
    case actionTypes.UPDATE_POST_FILEDS:
      return {
        ...state,
        [key]: data[key]
      }

    default:
      return state
  }
}
