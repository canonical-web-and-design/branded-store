import React, { Component } from 'react'
import './Header.css'

import avatar from './assets/avatar.png'

import { 
  Icon,
  If,
 } from 'toolkit'

const defaultProfileName = 'Lola Chang'

class Header extends Component {
  handleBackClick = (event) => {
    if (this.props.hasBack) {
      event.currentTarget.blur()
      this.props.onBackClick()
    }
  }
  handleProfileClick = (event) => {
    if (this.props.onProfileClick) {
      event.currentTarget.blur()
      this.props.onProfileClick()
    }
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
          <If cond={this.props.hasBack}>
            <div
              className='Header-back'
              role='button'
              tabIndex='0'
              onClick={this.handleBackClick}
            >
              <span>
                <Icon name='previous' size='30' />
              </span>
              <span>Back</span>
              <div className='Header-activeOverlay' />
            </div>
          </If>
          <div
            className='Header-profile'
            role='button'
            tabIndex='0'
            onClick={this.handleProfileClick}
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
