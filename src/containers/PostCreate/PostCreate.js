import React, { Component } from 'react'
import { PropTypes as Type } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './PostCreate.css'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { PostActions } from '../../actions'

import { 
  AdminPanel
} from '../../components'


@connect(state => ({
  post: state.post
}), dispatch => ({
  postActions: bindActionCreators(PostActions, dispatch)
}))

@CSSModules(styles, {allowMultiple: true})
export default class PostCreate extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context)
  }

  _onChange(e, value) {
    const data = {
      [e.currentTarget.name]: value
    }
    this.props.postActions.updatePostFileds( data );
  }

  _onSubmit() {
    this.props.postActions.addPost();
  }

  render() {

    const { title, content } = this.props.post

    return (
      <div styleName='root'>
        <AdminPanel 
          current='1'
        />  
        <div styleName='add'>
          <div styleName='add-title'>
            Создание поста
          </div>
          <div styleName='editor'>
            <div styleName='title'>
              <TextField
                ref='title'
                name='title'
                hintText="Заголовок"
                floatingLabelText="Заголовок"
                value={title}
                onChange={this._onChange.bind(this)}
              />
            </div>
            <div styleName='content'>
              <TextField
                ref='content'
                name='content'
                hintText="Что произошло?"
                multiLine={true}
                rows={1}
                rowsMax={4}
                value={content}
                onChange={this._onChange.bind(this)}
              />
            </div>
            <RaisedButton 
              label="Создать" 
              primary={true} 
              onClick={this._onSubmit.bind(this)}
            />
          </div>
        </div> 
      </div>
    )
  }
}
