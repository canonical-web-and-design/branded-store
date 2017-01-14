import React, { Component } from 'react'
import './SnapPageInstallButton.css'

import Button from 'toolkit/Button/Button'
import ProgressBar from 'toolkit/ProgressBar/ProgressBar'

class SnapPageInstallButton extends Component {
  constructor(props) {
    super(props)
    this.handleInstallClick = this.handleInstallClick.bind(this)
  }

  handleInstallClick() {
    const { onRequestInstall = () => {} } = this.props
    onRequestInstall(this.props.snapId)
  }

  render() {
    const {
      label,
      installProgress = 0,
      isInstalled,
    } = this.props
    return (
      <div className='SnapPageInstallButton'>
        {(() => {
          if (installProgress > 0) {
            return (
              <div className='SnapPageInstallButton-progress'>
                <div className='SnapPageInstallButton-progressLabel'>
                  Installing
                </div>
                <ProgressBar progress={installProgress} />
              </div>
            )
          }
          return (
            <div>
              <div className='SnapPageInstallButton-price'>
                {label}
              </div>
              <Button
                onClick={this.handleInstallClick}
                label={isInstalled? 'Uninstall' : 'Install'}
              />
            </div>
          )
        })()}
      </div>
    )
  }
}

export default SnapPageInstallButton
