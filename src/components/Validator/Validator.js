import React from 'react'
import Valya from 'valya'

@Valya
export default class Validator extends React.Component {
  static displayName = 'Validator';

  _addErrorMessage() {
    if (!this.props.enabled || this.props.isValid) {
      return null
    }
    return {
      errorStyle: { position: 'absolute', marginBottom: -25 },
      errorText: this.props.validationErrorMessage
    }
  }

  render () {
    return (
      <div>
        {React.cloneElement(
          React.Children.only(this.props.children),
          this._addErrorMessage()
        )}
      </div>
    )
  }
}
