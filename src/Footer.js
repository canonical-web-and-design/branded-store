import React from 'react'
import './Footer.css'
import logo from './Footer/footer-logo.svg'

function Footer(props) {
  return (
    <footer className='Footer'>
      <div>
        <p><strong>Snappy version 1.0</strong></p>
        <p>
          © 2016 Canonical Ltd. Ubuntu and Canonical are registered trademarks of Canonical Ltd.
        </p>
      </div>
      <img className='logo' src={logo} alt='Ubuntu Logo' />
    </footer>
  )
}

export default Footer
