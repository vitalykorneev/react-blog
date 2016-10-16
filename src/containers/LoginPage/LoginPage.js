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

import styles from './LoginPage.css'

import { AuthForm } from '../../components'
import { AuthActions } from '../../actions'

@connect(state => ({
  data: state.auth
}))

export default class LoginPage extends Component {
  static propTypes = {
    data: Type.object.isRequired,
    authAgent: Type.shape({
      login : Type.func.isRequired,
      logout: Type.func.isRequired
    }),
    dispatch: Type.func.isRequired
  };

  constructor(props, context) {
    super(props, context)
  }

  // Login action
  _login(data) {
    const {authAgent} = this.props
    this.props.dispatch(AuthActions.login(data, authAgent))
  }
  _changeForm(newState) {
    this.props.dispatch(AuthActions.changeForm(newState))
  }

  render() {
    const { data, dispatch } = this.props

    return (
      <div className={styles.loginPage}>
        <div className={styles.card}>
          <div className={styles.wrap}>

            <div className={styles.title}>Blog</div>
            <AuthForm
              onSubmit={::this._login}
              onFormChange={::this._changeForm}
              auth={data}
            />
          </div>
        </div>
        <div className={styles.info}>
          © 2016 Vitaly Korneev
        </div>
      </div>
    )
  }
}
