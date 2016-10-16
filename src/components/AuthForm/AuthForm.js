/**
 * AuthForm.js
 *
 * The form with a username and a password input field, both of which are
 * controlled via the application state.
 *
 */

import React, { Component, PropTypes as Type } from 'react'
import ReactDOM from 'react-dom'

import ga from 'react-ga'

import Validator from '../Validator/Validator'
import { changeForm } from '../../actions/AuthActions'
import * as actionTypes from '../../constants/AuthConstants'

import animate from '../../utils/animate'
import animateStyles from '../../utils/animate.css'

import { colors } from 'material-ui/styles'
import Card from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'

class AuthForm extends Component {
  constructor(props, context) {
    super(props, context)
  }

  static propTypes = {
    auth: Type.shape({
      type: Type.string,
      isLoading: Type.bool,
      formState: Type.object
    }).isRequired,
    onSubmit: Type.func.isRequired,
  };

  static contextTypes = {
    router: Type.object.isRequired
  };

  componentWillReceiveProps(newProps) {
    const { type } = newProps.auth

    if (type === actionTypes.AUTH_LOGIN_FAILED) {
      this._handleFailedSubmit()
    }
  }

  // Handle failed form submitting
  _handleFailedSubmit() {
    animate(ReactDOM.findDOMNode(this.refs.authFormCard), animateStyles.shake)
  }

  // Merges the current state with a change
  _mergeWithCurrentState(change) {
    return Object.assign(this.props.auth.formState, change)
  }

  // Emits a change of the form state to the application state
  _emitChange(newState) {
    this.props.onFormChange(newState)
  }

  // Change field value in the app state
  // Last param comes from checkboxes
  _changeField(name, e, val) {
    const newState = this._mergeWithCurrentState({
      [name]: e.target.type === 'checkbox' ? val : e.target.value
    })

    this._emitChange(newState)
  }

  // onSubmit call the passed onSubmit function
  _onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit({
      username: this.props.auth.formState.username,
      password: this.props.auth.formState.password,
      rememberMe: this.props.auth.formState.rememberMe
    })

    ga.event({
      category: 'Login',
      action: 'Submitted'
    })
  }

  _renderFields(fields) {
    return fields.map((field, i) => {
      // Standard validator
      const validators = [
        {
          validator(value, params) {
            if (value) return Promise.resolve()
            return Promise.reject(params.message)
          },
          params: {
            message: 'This field is required'
          }
        }
      ]

      return (
        <div key={i}>
          <Validator
          value={this.props.auth.formState[field]}
          validators={validators}
          initialValidation={false}>
            <TextField
              type={field === 'password' ? 'password' : 'text'}
              id={field}
              name={field}
              hintText={field === 'password' ? 'Пароль' : 'E-mail'}
              floatingLabelText={field === 'password' ? 'Пароль' : 'E-mail'}
              style={{marginBottom: 10}}
              fullWidth
              value={this.props.auth.formState[field]}
              onChange={this._changeField.bind(this, field)}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </Validator>
        </div>
      )
    })
  }

  render() {
    const fields = ['username', 'password']

    return (
      <Card 
        ref="authFormCard" 
        style={{
          position: 'relative',
          width: 390,
          height: 300,
          padding: '30px'
        }}
      >
        <form onSubmit={this._onSubmit.bind(this)} noValidate>
          {this._renderFields(fields)}

          <Checkbox
            fullWidth={false}
            name="rememberMe"
            checked={this.props.auth.formState['rememberMe']}
            onCheck={this._changeField.bind(this, 'rememberMe')}
            label="Запомнить"
            style={{
              position: 'absolute',
              width: 'auto',
              bottom: 35,
              left: 30
            }}
            iconStyle={{
              marginRight: 7
            }}
            labelStyle={{
              color: colors.grey500,
              fontSize: 14,
              whiteSpace: 'nowrap'
            }}
          />
          <FlatButton
            label='Войти'
            type="submit"
            backgroundColor={colors.indigo500}
            hoverColor={colors.indigo700}
            style={{
              position: 'absolute',
              right: 30,
              bottom: 30,
              width: 120,
              height: 40,
              color: colors.white
            }}
          />
        </form>
      </Card>
    )
  }
}

export default AuthForm
