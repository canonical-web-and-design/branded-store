import React, { Component } from 'react'
import './SettingsNavigation.css'

import { classes } from 'toolkit'

const pub = process.env.PUBLIC_URL

class SettingsNavigationItem extends Component {
  onClick = () => {
    this.props.onClick(
      this.props.defaultItem? '' : this.props.id
    )
  }
  render() {
    const { id, name, active } = this.props
    return (
      <a
        role='button'
        className={classes({
          'SettingsNavigation-item': true,
          'SettingsNavigation-item-active': active,
        })}
        onClick={this.onClick}
      >
        <img
          className='SettingsNavigation-icon'
          src={`${pub}/icons/settings/${id}.png`}
          alt=''
          width='18'
          height='18'
        />
        <span>{name}</span>
      </a>
    )
  }
}

export default class SettingsNavigation extends Component {
  render() {
    const { screen, screens, onNavChange } = this.props
    const currentScreen = screen || 'info'
    return (
      <div className='SettingsNavigation'>
        <nav>
          <ul>
            {screens.map((item, i) => (
              <li key={item[0]}>
                <SettingsNavigationItem
                  id={item[0]}
                  name={item[1]}
                  active={item[0] === currentScreen}
                  onClick={onNavChange}
                  defaultItem={i === 0}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    )
  }
}
