import React from 'react'
import './Footer.css'
import logo from './Footer/footer-logo.svg'

function Footer(props) {
  return (
    <footer className='Footer'>
      <div className='Footer-in'>
        <div className='Footer-infos'>
          <p><strong>Snappy version 1.0</strong></p>
          <p>
            © 2016 Canonical Ltd. Ubuntu and Canonical are registered trademarks of Canonical Ltd.
          </p>
        </div>
        <img className='Footer-logo' src={logo} alt='Ubuntu Logo' />
      </div>
    </footer>
  )
}

export default Footer
