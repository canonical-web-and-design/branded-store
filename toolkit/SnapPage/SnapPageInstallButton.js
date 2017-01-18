import React, { Component } from 'react'
import './SnapPageInstallButton.css'

import Button from 'toolkit/Button/Button'
import ProgressBar from 'toolkit/ProgressBar/ProgressBar'

const ProgressBarWrapper = ({ label, progress }) => (
  <div className='SnapPageInstallButton-progress'>
    <div className='SnapPageInstallButton-progressLabel'>
      {label}
    </div>
    <ProgressBar progress={progress} />
  </div>
)

const ButtonWrapper = ({ label, disabled, buttonLabel, type, onClick }) => (
  <div>
    <div className='SnapPageInstallButton-price'>
      {label === 'free' ? 'Free' : ( label? (
        <span>
          <span>Snap Price: </span>
          <span style={{fontWeight: 400}}>{label}</span>
        </span>
      ) : null)}
    </div>
    <Button
      onClick={onClick}
      label={buttonLabel}
      type={type}
      disabled={disabled}
    />
  </div>
)

class SnapPageInstallButton extends Component {

  handleButtonClick = () => {
    const { status, onRequestInstall, onRequestRemove } = this.props

    if (status === 'uninstalled' && onRequestInstall) {
      return onRequestInstall(this.props.snapId)
    }

    if (status === 'installed' && onRequestRemove) {
      return onRequestRemove(this.props.snapId)
    }
  }

  render() {

    const {
      priceLabel,
      snapName,
      status,
      installProgress = 0,
    } = this.props

    const processing = [
      'wait-signin',
      'signing-in',
      'wait-authorize',
      'authorizing',
      'wait-confirm',
      'confirming',
    ].includes(status)

    const buttonLabel = (() => {
      if (status === 'installed') return 'Remove'
      if (priceLabel === 'free') return 'Install'
      if (processing) return 'Processing…'
      return `Purchase ${snapName}`
    })()

    return (
      <div className='SnapPageInstallButton'>
        {status === 'installing'? (
          <ProgressBarWrapper
            label={installProgress < 0.8? 'Downloading' : 'Installing'}
            progress={installProgress}
          />
        ) : (
          <ButtonWrapper
            label={status === 'uninstalled'? priceLabel : ''}
            buttonLabel={buttonLabel}
            type={status === 'uninstalled'? 'positive' : 'normal'}
            onClick={this.handleButtonClick}
            disabled={processing}
          />
        )}
      </div>
    )
  }
}

export default SnapPageInstallButton
