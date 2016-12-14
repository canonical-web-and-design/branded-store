import React from 'react';
import './Header.css';
import leftImage from './Header/header-left.png'
import rightImage from './Header/header-right.png'

function Header(props) {
  return (
    <header className='Header'>
      <img className='header-left' height="50" src={leftImage} alt='Header left' />
      <img className='header-right' height="50" src={rightImage} alt='Header right' />
    </header>
  )
}

export default Header
