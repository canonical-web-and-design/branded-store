import React, { Component } from 'react'
import './Header.css'

import defaultLogo from './assets/logo.svg'
import avatar from './assets/avatar.png'

// item icons
import iconStore from './assets/store.svg'
import iconSettings from './assets/settings.svg'

const defaultName = 'Ubuntu'
const defaultProfileName = 'Karl Waghorn-Moyce'

const itemIcons = {
  store: iconStore,
  settings: iconSettings,
}

class MenuItem extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }
  onClick(event) {
    event.currentTarget.blur()
    this.props.onClick(this.props.id)
  }
  render() {
    const { name, id, current } = this.props
    return (
      <li
        role='button'
        tabIndex='0'
        onClick={this.onClick}
        className={current? 'current' : ''}
      >
        {itemIcons[id]? (
          <img
            src={itemIcons[id]}
            alt=''
          />
        ) : null}
        <span>{name}</span>
      </li>
    )
  }
}

class Header extends Component {
  constructor(props) {
    super(props)
    this.onLogoClick = this.onLogoClick.bind(this)
    this.onMenuItemClick = this.onMenuItemClick.bind(this)
    this.onProfileClick = this.onProfileClick.bind(this)
  }
  onLogoClick(event) {
    event.currentTarget.blur()
    this.props.onMenuItemClick('home')
  }
  onProfileClick(event) {
    event.currentTarget.blur()
    this.props.onMenuItemClick('profile')
  }
  onMenuItemClick(id) {
    this.props.onMenuItemClick(id)
  }
  render() {
    const { props } = this
    return (
      <header className='Header'>
        <h1
          className='Header-logo'
          role='button'
          tabIndex='0'
          onClick={this.onLogoClick}
        >
          <img
            src={props.logo || defaultLogo}
            alt={props.name || defaultName}
          />
        </h1>
        <nav className='Header-nav'>
          <ul>
            {(props.menuitems || []).map(item => (
              <MenuItem
                key={item.id}
                id={item.id}
                name={item.name}
                onClick={this.onMenuItemClick}
                current={item.id === props.currentSection}
              />
            ))}
          </ul>
        </nav>
        <div
          className='Header-profile'
          role='button'
          tabIndex='0'
          onClick={this.onProfileClick}
        >
          <img width='24' height='24' src={avatar} alt='' />
          <span>{props.profilename || defaultProfileName}</span>
        </div>
      </header>
    )
  }
}

export default Header
