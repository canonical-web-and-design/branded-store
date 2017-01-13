import React from 'react'
import './SnapPageInstallButton.css'

import ProgressBar from 'toolkit/ProgressBar/ProgressBar'

export default function SnapPageInstallButton({
  label,
  installProgress = 0,
}) {
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
            <button
              type='button'
              className='SnapPageInstallButton-button'
            >
              Install
            </button>
          </div>
        )
      })()}
    </div>
  )
}
