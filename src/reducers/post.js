import * as actionTypes from '../constants/PostConstants'

const initialState = {
  title: '',
  content: ''
}

export default function post(state = initialState, action) {
  const { type, data } = action

  switch (type) {
    case actionTypes.ADD_POST:
      return state
    case actionTypes.UPDATE_POST_FILEDS:
      return {
        ...state,
        title: data.title || state.title,
        content: data.content || state.content
      }
    case actionTypes.CLEARE_POST_FILEDS:
      return {
        ...state,
        title: '',
        content: ''
      }

    default:
      return state
  }
}
