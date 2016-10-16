import React, { Component } from 'react'
import { PropTypes as Type } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Editor, EditorState} from 'draft-js'
import CSSModules from 'react-css-modules'
import styles from './EditorPost.css'


@CSSModules(styles, {allowMultiple: true})
export default class EditorPost extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  render() {
    const {editorState} = this.state;
    return (
      <div styleName='root'>
        <div styleName='buttons'>
          <div styleName='button'>
            <button onClick={this._onBoldClick.bind(this)}>Bold</button>
          </div>
        </div>
        <Editor editorState={editorState} onChange={this.onChange} />
      </div>
    );
  }
}