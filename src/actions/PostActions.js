import * as actionTypes from '../constants/PostConstants'
import genSalt from '../utils/salt'
import { browserHistory } from 'react-router'
import _ from 'lodash'

import apiCall from '../utils/apiCall'

export function getPosts() {
  return (dispatch, getState) => {
      apiCall({
        method: 'GET',
        path: '/post'
      })
      .then(res => {
        console.log('res');
        console.log(res.data);
        
        dispatch({
          type: actionTypes.GET_POSTS,
          posts: res.data
        })
      })
      .catch(res => {
        
      })
  }
}

export function addPost() {
  return (dispatch, getState) => {

    const state =  getState()
    let { post } = state
    post = Object.assign({}, post, { id: 1 })

      apiCall({
        method: 'POST',
        path: '/post',
        data: post
      })
      .then(res => {
        dispatch(clearePostFileds());
      })
      .catch(res => {
        
      })
  }
}

export function updatePost(id) {
  return (dispatch, getState) => {

    const state =  getState()
    let { post } = state

      apiCall({
        method: 'PUT',
        path: `/post/${id}`,
        data: post
      })
      .then(res => {
        // dispatch(clearePostFileds());
      })
      .catch(res => {
        
      })
  }
}

export function deletePost(post) {
  return (dispatch, getState) => {

    const state =  getState()
    const postsOld = state.posts.posts
    let posts = [].concat([], postsOld);

    let deletedPostId = 0;
    
    const deletedPost = _.find(posts, function(_post, _id) {
      deletedPostId = _id
      return _post.id === post.id; 
    })

    posts.splice(deletedPostId, 1)

    dispatch({ type: actionTypes.DELETE_POST, posts })

    apiCall({
      method: 'DELETE',
      path: '/post',
      data: post
    })
    .then(res => {

    })
    .catch(res => {
      
    })
  }
}

export function clearePostFileds() {
  return (dispatch, getState) => {

    dispatch({ type: actionTypes.CLEARE_POST_FILEDS })
  }
}
export function updatePostFileds(data) {
  return (dispatch, getState) => {

    const state =  getState();
    dispatch({ type: actionTypes.UPDATE_POST_FILEDS, data })
  }
}