import * as actionTypes from '../constants/PostConstants'
import genSalt from '../utils/salt'
import { browserHistory } from 'react-router'

import apiCall from '../utils/apiCall'

export function addPost() {
  return (dispatch, getState) => {
    // dispatch({ type: actionTypes.ADD_POST })

    const state =  getState()
    let { post } = state
    post = Object.assign({}, post, { id: 1 })

    console.log(post);

      apiCall({
        method: 'POST',
        path: '/post',
        data: post
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
        
      })
  }
}
export function updatePostFileds(data) {
  return (dispatch, getState) => {

    const state =  getState();
    dispatch({ type: actionTypes.UPDATE_POST_FILEDS, data })
  }
}