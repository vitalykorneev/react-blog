import React, { Component, PropTypes as Type } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Post.css'
import moment from 'moment'

@CSSModules(styles, {allowMultiple: true})
export default class Post extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    tile: Type.string,
    content: Type.string,
    date: Type.string
  };
  render() {
    const { date, title, content } = this.props
    const momentDate = moment(date).format('YYYY-MM-DD HH:MM')
    
    return (
      <div styleName='root'>
        <div styleName='date'>{momentDate}</div>
        <div styleName='title'>{title}</div>
        <div styleName='content'>{content}</div>
      </div>
    )
  }
}
