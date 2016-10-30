import React, { Component } from 'react'
import { PropTypes as Type } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './Posts.css'
import { PostActions } from '../../actions'

import { 
  AdminPanel, 
  PostsList 
} from '../../components'

@connect(state => ({
  posts: state.posts
}), dispatch => ({
  postActions: bindActionCreators(PostActions, dispatch)
}))

@CSSModules(styles, {allowMultiple: true})
export default class Posts extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context)
  }

  componentWillMount() {
    this.props.postActions.getPosts()
  }

  render() {
    const { posts, postActions } = this.props

    return (
      <div styleName='root'>
        <AdminPanel 
          current='0'
        />
        <PostsList
          posts={posts.posts}
          actions={postActions}
        />
      </div>
    )
  }
}
