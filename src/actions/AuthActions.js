/*
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return function(dispatch) {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        }
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

import bcrypt from 'bcryptjs'
import * as actionTypes from '../constants/AuthConstants'
import genSalt from '../utils/salt'
import { browserHistory } from 'react-router'

import apiCall from '../utils/apiCall'

/**
 * Logs an user in
 * @param  {string} username The username of the user to be logged in
 * @param  {string} password The password of the user to be logged in
 */
export function login(data, authAgent) {
  return (dispatch) => {
    dispatch({ type: actionTypes.AUTH_LOGIN_REQUESTED })

    // Generate salt for password encryption
    const salt = genSalt(data.username)
    // Encrypt password
    bcrypt.hash(data.password, salt, (err, hash) => {
      // Something wrong while hashing
      if (err) {
        requestFailed({
          type: 'failed'
        })
        return
      }

      apiCall({
        method: 'POST',
        path: '/login',
        data: {
          email: data.username, // test
          password: data.password, // 123
          client_id: '0LGPFHX6NR',
          client_secret: 'Gz4W9YzBXc7l4B561kyAi8xMYwNTdv',
          grant_type: 'password'
        }
      })
        .then(res => {
          console.log('res');
          console.log(res);

          if (!res.data.user) {

            dispatch({
              type: actionTypes.AUTH_LOGIN_FAILED,
              errors: {
                code: res.status,
                data: res.data
              }
            })

            return
          }

          const user = {
            email: res.data.user.email,
            name: res.data.user.name
          }
          const token = res.data.access_token

          authAgent.login(user, token, {
            sessionOnly: !data.rememberMe,
            cb: () => {
              dispatch({
                type: actionTypes.AUTH_LOGIN_SUCCEED,
                user
              })

              forwardTo('/posts')
            }
          })

          // Reset form
          dispatch(changeForm({
            email: '',
            password: ''
          }))
        })
        .catch(res => {
          dispatch({
            type: actionTypes.AUTH_LOGIN_FAILED,
            errors: {
              code: res.status,
              data: res.data
            }
          })
        })
    })
  }
}


/**
 * Logs the current user out
 */
export function logout(authAgent) {
  return (dispatch) => {
    apiCall({
      method: 'GET',
      path: '/user/logout',
      query: {
        access_token: authAgent.getToken()
      }
    })
      .then(res => {
        authAgent.logout(() => {
          forwardTo('/')
          dispatch({
            type: actionTypes.AUTH_LOGGED_OUT
          })
        })
      })
      .catch(res => {
        dispatch({
          type: actionTypes.AUTH_LOGIN_FAILED,
          errors: {
            code: res.status,
            data: res.data
          }
        })
      })
  }
}

/**
 * Sets the form state
 * @param  {object} newState             The new state of the form
 * @param  {string} newState.username    The new text of the username input field of the form
 * @param  {string} newState.password    The new text of the password input field of the form
 * @param  {boolean} newState.rememberMe The new text of the password input field of the form
 * @return {object}                       Formatted action for the reducer to handle
 */
export function changeForm(newState) {
  return { type: actionTypes.AUTH_FORM_CHANGED, formState: newState }
}

/**
 * Forwards the user
 * @param {string} location The route the user should be forwarded to
 */
function forwardTo(location) {
  console.log('forwardTo(' + location + ')')
  browserHistory.push(location)
}

/**
 * Called when a request failes
 * @param  {object} err An object containing information about the error
 */
function requestFailed(err) {
}
