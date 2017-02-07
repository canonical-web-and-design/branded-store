import React from 'react'
import './SettingsPage.css'

import { 
  If,
  ContentWrapper,
} from 'toolkit'

import SettingsNavigation from './SettingsNavigation'

export default function SettingsPage({ screenId, onNavChange }) {

  const pub = process.env.PUBLIC_URL

  const screens = [
    ['info', 'Device information'],
    ['date-time', 'Date and time'],
    ['updates', 'Updates'],
    ['users', 'Users'],
    // ['profile', 'Profile'],
    // ['customization', 'Customization'],
  ]

  const screen = screens.find(
    screen => (screen[0] === screenId)
  ) || screens[0]

  const useDummyScreens = true

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
            <If cond={useDummyScreens}>
              <img
                className='SettingsPage-dummyContent'
                src={`${pub}/settings/settings-${screen[0]}.png`}
                width='710'
                alt=''
              />
            </If>
            <If cond={!useDummyScreens}>
              <h1 className='SettingsPage-title'>{screen[1]}</h1>
            </If>
          </div>
        </div>

      </ContentWrapper>
    </div>
  )
}
