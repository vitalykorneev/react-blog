import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Import the containers used as pages
import {
  App,
  LoginPage,
  Posts,
  PostCreate
} from './containers'

export default (authAgent) => {
  function checkAuth(nextState, replace) {
    // Check logging by cookies
    if (authAgent.isLoggedIn()) {
      // Redirect from / to /campaigns when user is logged in
      if (nextState.location.pathname === '/') {
        replace('/admin/posts')
        console.log('already logged in :)')
      }
    } else {
      if (nextState.location.pathname !== '/') {
        replace('/admin')
      }
      console.log('not logged yet :(')
    }
  }

  return (
    <Route path="admin" component={App}>
      <IndexRoute component={LoginPage} onEnter={checkAuth} />
      <Route path="posts" component={Posts} onEnter={checkAuth}>
      </Route>
      <Route path="post" onEnter={checkAuth}>
        <Route path="create" component={PostCreate} onEnter={checkAuth} />
        <Route path=":id/edit" component={PostCreate} onEnter={checkAuth} />
      </Route>
    </Route>
  )
}
