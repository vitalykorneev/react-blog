  /*
 * LoginPage
 *
 * Users login on this page
 * Route: /
 *
 */

import React, { Component } from 'react'
import { PropTypes as Type } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import styles from './Posts.css'

@connect(state => ({
  data: state.auth
}))

export default class Posts extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context)
  }
  render() {
    const { data, dispatch } = this.props

    return (
      <div>
        posts!
      </div>
    )
  }
}
