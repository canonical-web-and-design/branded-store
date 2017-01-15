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

const ButtonWrapper = ({ label, buttonLabel, positive, onClick }) => (
  <div>
    <div className='SnapPageInstallButton-price'>
      {label}
    </div>
    <Button
      onClick={onClick}
      label={buttonLabel}
      positive={positive}
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
      status,
      installProgress = 0,
    } = this.props

    const buttonLabel = status === 'installed'? 'Remove' : 'Install'

    return (
      <div className='SnapPageInstallButton'>
        {status === 'installing'? (
          <ProgressBarWrapper
            label={'Installing'}
            progress={installProgress}
          />
        ) : (
          <ButtonWrapper
            label={status === 'uninstalled'? priceLabel : ''}
            buttonLabel={buttonLabel}
            positive={status === 'uninstalled'}
            onClick={this.handleButtonClick}
          />
        )}
      </div>
    )
  }
}

export default SnapPageInstallButton
