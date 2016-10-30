import React, { Component, PropTypes as Type } from 'react'
import CSSModules from 'react-css-modules'
import styles from './AdminPanel.css'
import Avatar from 'material-ui/Avatar';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import { Link } from 'react-router'

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import ActionReorder from 'material-ui/svg-icons/action/reorder';
import EditorEdit from 'material-ui/svg-icons/editor/mode-edit';
import {red500, blue500, black500} from 'material-ui/styles/colors';

@CSSModules(styles, {allowMultiple: true})

export default class AdminPanel extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    current: Type.string
  };


  render() {

    const { current } = this.props

    return (
      <div styleName='root'>
        <div styleName='logo'>
          <div styleName='logo-text'>
            B
          </div>
        </div>
        <div styleName='user'>
          <Avatar
            color="#fff"
            backgroundColor="#000"
            style={{ margin: 'auto' }}
            size='30'
          >
            V
          </Avatar>
        </div>
        <div styleName='nav'>
          <IconButton
            containerElement={<Link to="/admin/posts" />}
            linkButton={true}
          >
            <ActionReorder color={current === '0' ? blue500 : black500} />
          </IconButton>
          <IconButton
            containerElement={<Link to="/admin/post/create" />}
            linkButton={true}
          >
            <EditorEdit color={current === '1' ? blue500 : black500} />
          </IconButton>
        </div>
      </div>
    )
  }
}
