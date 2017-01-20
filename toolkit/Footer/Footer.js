import React from 'react'
import './Footer.css'

import defaultLogo from './assets/logo.png'
const defaultName = 'Ubuntu'
const defaultCopyright = '© 2017 Canonical Ltd. Ubuntu and Canonical are registered trademarks of Canonical Ltd.'

function Footer({
  children,
  firstLine,
  copyright = defaultCopyright,
  logo = defaultLogo,
  name = defaultName,
}) {
  return (
    <footer className='Footer'>
      {children || (
        <div className='Footer-in'>
          <div className='Footer-infos'>
            <p>{firstLine}</p>
            <p className='Footer-copyright'>
              {copyright}
            </p>
          </div>
          <img className='Footer-logo'
            src={logo}
            alt={name}
            height='48'
          />
        </div>
      )}
    </footer>
  )
}

export default Footer
