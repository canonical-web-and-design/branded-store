import React from 'react'
import './Footer.css'
import defaultLogo from './assets/logo.png'

const defaultName = 'Ubuntu'

function Footer(props) {
  return (
    <footer className='Footer'>
      {props.children || (
        <div className='Footer-in'>
          <div className='Footer-infos'>
            <p>
              <strong>Snappy version 1.0</strong>
              {props.firstLine}
            </p>
            <p className='Footer-copyright'>
              © 2017 Canonical Ltd. Ubuntu and Canonical are registered trademarks of Canonical Ltd.
            </p>
          </div>
          <img className='Footer-logo'
            src={props.logo || defaultLogo}
            alt={props.name || defaultName}
            height='48'
          />
        </div>
      )}
    </footer>
  )
}

export default Footer
