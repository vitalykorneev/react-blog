import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Import the containers used as pages
import {
  App,
  LoginPage,
  Posts,
} from './containers'

export default (authAgent) => {
  function checkAuth(nextState, replace) {
    // Check logging by cookies
    if (authAgent.isLoggedIn()) {
      // Redirect from / to /campaigns when user is logged in
      if (nextState.location.pathname === '/') {
        replace('/posts')
        console.log('already logged in :)')
      }
    } else {
      if (nextState.location.pathname !== '/') {
        replace('/')
      }
      console.log('not logged yet :(')
    }
  }

  return (
    <Route path="/" component={App}>
      <IndexRoute component={LoginPage} onEnter={checkAuth} />
      <Route path="posts" component={Posts} onEnter={checkAuth} />
    </Route>
  )
}
