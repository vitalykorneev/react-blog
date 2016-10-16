/**
 *
 * app.js
 *
 * This is the entry file for the application, mostly just setup and boilerplate code
 *
 */

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import Perf from 'react-addons-perf'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import ga from 'react-ga'

import configureStore from './store/configureStore'
import DevTools from './containers/DevTools/DevTools'
import getRoutes from './routes'
import setCookieDomain from './utils/setCookieDomain'
import Auth from './utils/Auth'

const isProd = process.env.NODE_ENV === 'production'

// Needed for React Developer Tools
if (!isProd) {
  window.React = React
  window.Perf = Perf
}

// Needed for onTouchTap (works with Material UI)
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

const store = configureStore()

// Browsers can't save cookies with localhost domain option
// For this, update your hosts file:
// 127.0.0.1    blog.app
// And run http://blog.app:3000/ in your browser
const cookieDomain = setCookieDomain(document.location.hostname)
const authAgent = new Auth(document, cookieDomain)

const appComponent = (Component, props) => (
  <Component {...props} authAgent={authAgent} />
)

const logPageView = () => {
  ga.pageview(window.location.pathname)
}

const AppContainer = (
  <Provider store={store}>
    <div>
      <Router history={browserHistory}
        children={getRoutes(authAgent)}
        createElement={appComponent}
        onUpdate={logPageView}
      />
      {!isProd ? <DevTools /> : ''}
    </div>
  </Provider>
)

ReactDOM.render(AppContainer, document.getElementById('app'))
