import React, { PureComponent } from 'react'
import './DeviceBanner.css'

import {
  If,
  Button,
  Icon,
} from 'toolkit'

class DeviceBanner extends PureComponent {

  handleSettingsClick = () => {
    this.props.onSettingsClick()
  }

  render() {

    const {
      brandName,
      image,
      deviceName,
      deviceId,
    } = this.props

    return (
      <section className='DeviceBanner'>
        <If cond={image}>
          <div className='DeviceBanner-image'>
            <img alt='' src={image} />
          </div>
        </If>
        <div>
          <h1 className='DeviceBanner-name'>{deviceName}</h1>
          <p className='DeviceBanner-brandName'>
            <strong>By {brandName}</strong>
          </p>
          <p className='DeviceBanner-id'>
            {deviceId}
          </p>
          <div className='DeviceBanner-buttoncontainer'>
            <Button
              style={{
                marginRight: '10px',
              }}
            >
              <span>
                Documentation
                <span className='Link-external-icon'>
                  <Icon name='external' />
                </span>
              </span>
            </Button>
            <Button
              label={'Settings'}
              onClick={this.handleSettingsClick}
            />
          </div>
          
        </div>
      </section>
    )
  }
}

export default DeviceBanner
