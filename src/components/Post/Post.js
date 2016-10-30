import React, { Component, PropTypes as Type } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Post.css'
import moment from 'moment'
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'

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

  _hendlerDeletePost(id) {
    this.props.deletePost({ id })
  }

  render() {
    const { date, title, content, id } = this.props
    const momentDate = moment(date).format('YYYY-MM-DD HH:MM')
    
    return (
      <div styleName='root'>
        <div styleName='date'>{momentDate}</div>
        <div styleName='title'>{title}</div>
        <div styleName='content'>{content}</div>
        <div styleName='controls'>
          <FlatButton label="Изменить" primary={true} 
            containerElement={<Link to={`/admin/post/${id}/edit`} />}
            linkButton={true}
          />
          <FlatButton label="Удалить" secondary={true} 
            onClick={this._hendlerDeletePost.bind(this, id)}
          />
        </div>
      </div>
    )
  }
}
