import React, { Component } from 'react'
import './SnapPageConfirm.css'

import Button from 'toolkit/Button/Button'

export default class SnapPageConfirm extends Component {
  buttonClick = () => {
    const { status, onConfirm } = this.props
    if (status === 'wait-confirm') {
      onConfirm()
      return
    }
  }
  render() {
    const { status } = this.props

    const waiting = status === 'confirming'

    const buttonLabel = (() => {
      if (status === 'wait-confirm') return 'Confirm purchase'
      if (status === 'confirming') return 'Purchasing…'
    })()

    return (
      <div className='SnapPageConfirm'>

        <div className='SnapPageConfirm-part'>
          <h1 className='SnapPageConfirm-part-title'>
            Welcome, Jamie Young
          </h1>
          <p>
            <span>
              You are signed in with the email address jamie.young@canonical.com.
              {' '}
            </span>
            <strong>Not Jamie?{' '}</strong>
            <a className='external'>Manage your SSO account</a>
          </p>
        </div>

        <div className='SnapPageConfirm-part'>
          <h1 className='SnapPageConfirm-part-title'>
            You’ve saved payment details
          </h1>
          <p>
            <span>You have a card saved.{' '}</span>
            <a className='external'>Manage your payment details</a>
          </p>
        </div>

        <div className='SnapPageConfirm-footer'>
          <div className='SnapPageConfirm-validateGroup'>
            <a
              role='button'
              className='SnapPageConfirm-validateGroup-cancel'
            >
              Cancel
            </a>
            <Button
              label={buttonLabel}
              type='positive'
              onClick={this.buttonClick}
              loading={waiting}
            />
          </div>
        </div>

      </div>
    )
  }
}
