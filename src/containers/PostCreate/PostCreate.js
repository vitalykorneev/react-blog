import React, { Component } from 'react'
import { PropTypes as Type } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './PostCreate.css'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { PostActions } from '../../actions'
import _ from 'lodash'
import Snackbar from 'material-ui/Snackbar';

import { 
  AdminPanel
} from '../../components'


@connect(state => ({
  posts: state.posts,
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
    this.state = {
      snackbarOpen: false
    }
  }

  componentWillMount() {
    const { routeParams } = this.props
    if (routeParams.id) {
      const post = _.find(this.props.posts.posts, { id: parseInt(routeParams.id, 10)})
      this.props.postActions.updatePostFileds( post )
    } else {
      this.props.postActions.clearePostFileds()
    }
  }

  _onChange(e, value) {
    const data = {
      [e.currentTarget.name]: value
    }
    this.props.postActions.updatePostFileds( data );
  }

  _onSubmit() {
    const { routeParams } = this.props
    
    if (routeParams.id) {
      this.props.postActions.updatePost(routeParams.id);
    } else {
      this.props.postActions.addPost();
    }
    this._handleRequestOpen();
  }

  _handleRequestClose() {
    this.setState({ snackbarOpen: false })
  }
  _handleRequestOpen() {
    this.setState({ snackbarOpen: true })
  }

  render() {

    const { routeParams } = this.props
    const { title, content } = this.props.post
    const titlePage = routeParams.id ? 'Изменение поста' : 'Создание поста'
    const titleButton = routeParams.id ? 'Изменить' : 'Создать'
    const snackbarMeggage = routeParams.id ? 'Пост изменен' : 'Пост создан'

    return (
      <div styleName='root'>
        <AdminPanel 
          current='1'
        />  
        <div styleName='add'>
          <div styleName='add-title'>
            {titlePage}
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
              label={titleButton}
              primary={true} 
              onClick={this._onSubmit.bind(this)}
            />
          </div>
        </div> 
        <Snackbar
          open={this.state.snackbarOpen}
          message={snackbarMeggage}
          autoHideDuration={4000}
          onRequestClose={this._handleRequestClose.bind(this)}
        />
      </div>
    )
  }
}
