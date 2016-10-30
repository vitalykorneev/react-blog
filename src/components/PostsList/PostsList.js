import React, { Component, PropTypes as Type } from 'react'
import CSSModules from 'react-css-modules'
import styles from './PostsList.css'
import Avatar from 'material-ui/Avatar';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import { Link } from 'react-router'
import Post from '../Post/Post'

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import ActionReorder from 'material-ui/svg-icons/action/reorder';
import EditorEdit from 'material-ui/svg-icons/editor/mode-edit';
import {red500, blue500, black500} from 'material-ui/styles/colors';

@CSSModules(styles, {allowMultiple: true})
export default class PostsList extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    posts: Type.array
  };


  render() {
    const { posts } = this.props

    return (
      <div styleName='root'>
        {
          posts.map((post, key) => (
            <Post 
              key={key}
              id={post.id}
              date={post.updatedAt}
              title={post.title}
              content={post.content}
              deletePost={this.props.actions.deletePost}
            />
          ))
        }
      </div>
    )
  }
}
