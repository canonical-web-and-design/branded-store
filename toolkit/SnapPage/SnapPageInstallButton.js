import React, { Component } from 'react'
import './SnapPageInstallButton.css'

import If from 'toolkit/If'
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

const ButtonWrapper = ({
  label,
  disabled,
  buttonLabel,
  type,
  onClick,
  disabled2,
  buttonLabel2,
  type2,
  onClick2,
}) => (
  <div>
    <div className='SnapPageInstallButton-price'>
      {label === 'free' ? 'Free' : ( label? (
        <span>
          <span>Snap Price: </span>
          <span style={{fontWeight: 400}}>{label}</span>
        </span>
      ) : null)}
    </div>

    <If cond={buttonLabel2}>
      <Button
        style={{
          marginRight: '10px'
        }}
        variableWidth={true}
        onClick={onClick2}
        label={buttonLabel2}
        type={type2}
        disabled={disabled2}
      />
    </If>

    <Button
      onClick={onClick}
      label={buttonLabel}
      type={type}
      disabled={disabled}
      variableWidth={buttonLabel2}
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
      'confirming1',
      'confirming2',
    ].includes(status)

    const buttonLabel = (() => {
      if (status === 'installed') return 'Remove'
      if (priceLabel === 'free') return 'Install'
      if (processing) return 'Processing…'
      return `Buy ${snapName}`
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

            buttonLabel2={status === 'installed'? 'Open' : ''}
            type2={'normal'}
            onClick2={() => {}}
            disabled2={false}
          />
        )}
      </div>
    )
  }
}

export default SnapPageInstallButton
