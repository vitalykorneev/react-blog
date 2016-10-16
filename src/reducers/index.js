/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return {
 *     ...state,
 *     stateVariable: action.var
 *   }
 */

import { combineReducers } from 'redux'
import auth from './auth'
import post from './post'
import posts from './posts'

const rootReducer = combineReducers({
  auth,
  post,
  posts
})

export default rootReducer
