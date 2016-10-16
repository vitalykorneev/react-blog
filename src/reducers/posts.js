import * as actionTypes from '../constants/PostConstants'

const initialState = {
  posts: []
}

export default function posts(state = initialState, action) {
  const { type, posts } = action

  switch (type) {
    case actionTypes.GET_POSTS:
      return {
        ...state,
        posts
      }

    default:
      return state
  }
}
