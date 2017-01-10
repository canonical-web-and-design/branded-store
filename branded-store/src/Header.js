import React, { Component } from 'react'
import './Header.css'

import defaultLogo from './assets/logo.svg'

// item icons
import iconStore from './Header/store.svg'
import iconSettings from './Header/settings.svg'

const itemIcons = {
  store: iconStore,
  settings: iconSettings,
}

const defaultName = 'Ubuntu'

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
    const { name, id } = this.props
    return (
      <li
        role='button'
        tabIndex='0'
        onClick={this.onClick}
      >
        {itemIcons[id]? (
          <img
            src={itemIcons[id]}
            alt=''
          />
        ) : null}
        {name}
      </li>
    )
  }
}

class Header extends Component {
  constructor(props) {
    super(props)
    this.onLogoClick = this.onLogoClick.bind(this)
    this.onMenuItemClick = this.onMenuItemClick.bind(this)
  }
  onLogoClick(event) {
    event.currentTarget.blur()
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
              />
            ))}
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header
