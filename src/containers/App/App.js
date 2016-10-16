/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

// Import stuff
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import ProjectRawTheme from '../../theme/material_ui_raw_theme'
import { getMuiTheme } from 'material-ui/styles'
import * as actions from '../../actions'
import CSSModules from 'react-css-modules'
import styles from './App.css'

@CSSModules(styles, {allowMultiple: true})
class App extends Component {
  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object }
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(ProjectRawTheme)}
  }

  render() {
    return (
      <div styleName="app">
        { this.props.children }
      </div>
    )
  }
}

// export default App

// REDUX STUFF
// Which props do we want to inject, given the global state?
const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(App)
