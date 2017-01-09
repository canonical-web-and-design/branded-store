import React from 'react';
import './Header.css';
import leftImage from './Header/header-left.png'
import rightImage from './Header/header-right.png'
// import logo from './assets/logo.svg'

function Header(props) {
  return (
    <header className='Header'>

      {/*
      <h1 className='Header-logo'>
        <img src={logo} alt='Ubuntu' />
      </h1>

      <nav className='Header-nav'>
        <ul>
          <li>My Apps</li>
          <li>Categories</li>
        </ul>
      </nav>
      */}

      <img
        className='header-left'
        height="50"
        src={leftImage}
        alt='Header left'
      />
      <img
        className='header-right'
        height="50"
        src={rightImage}
        alt='Header right'
      />
    </header>
  )
}

export default Header
