import React, { Component } from 'react'
import { PropTypes as Type } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './Posts.css'

import { 
  AdminPanel, 
  // PostsList 
} from '../../components'

@connect(state => ({
  data: state.auth
}))

@CSSModules(styles, {allowMultiple: true})
export default class Posts extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context)
  }
  render() {
    const { data, dispatch } = this.props

    return (
      <div styleName='root'>
        <AdminPanel 
          current='0'
        />
      </div>
    )
  }
}
