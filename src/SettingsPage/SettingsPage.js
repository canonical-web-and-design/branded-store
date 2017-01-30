import React from 'react'
import './SettingsPage.css'

import { ContentWrapper } from 'toolkit'
import SettingsNavigation from './SettingsNavigation'

export default function SettingsPage({ screenId, onNavChange }) {

  const screens = [
    ['info', 'Device information'],
    ['profile', 'Profile'],
    ['users', 'Users'],
    ['updates', 'Updates'],
    ['date-time', 'Date and time'],
    // ['customization', 'Customization'],
  ]

  const screen = screens.find(
    screen => (screen[0] === screenId)
  ) || screens[0]

  return (
    <div className='SettingsPage'>
      <ContentWrapper>

        <div className='SettingsPage-main'>
          <div className='SettingsPage-navigation'>
            <SettingsNavigation
              screen={screen[0]}
              screens={screens}
              onNavChange={onNavChange}
            />
          </div>
          <div className='SettingsPage-content'>
            <h1 className='SettingsPage-title'>{screen[1]}</h1>
          </div>
        </div>

      </ContentWrapper>
    </div>
  )
}
