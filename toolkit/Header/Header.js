import React, { Component } from 'react'
import './Header.css'

import defaultLogo from './assets/logo.png'
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
    const { name, id, current, currentColor } = this.props
    const currentLineStyles = {}
    if (currentColor) {
      currentLineStyles.background = currentColor
    }
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
        {current && (
          <div
            className='Header-nav-currentLine'
            style={currentLineStyles}
          />
        )}
        <div className='Header-activeOverlay' />
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
    const styles = props.customColor? {
      borderColor: props.customColor,
    } : {}
    return (
      <header
        className='Header'
        style={styles}
      >
        <div
          className='Header-underline'
          style={{ background: props.customColor || '#CDCDCD' }}
        />
        <div className='Header-in'>
          <h1
            className='Header-logo'
            role='button'
            tabIndex='0'
            onClick={this.onLogoClick}
          >
            <img
              src={props.logo || defaultLogo}
              alt={props.name || defaultName}
              height='48'
            />
            <div className='Header-activeOverlay' />
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
                  currentColor={props.customColor}
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
            <div className='Header-activeOverlay' />
          </div>
        </div>
      </header>
    )
  }
}

export default Header
