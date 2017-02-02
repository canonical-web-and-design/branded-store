import React, { PureComponent } from 'react'
import './DeviceBanner.css'

import {
  If,
  Link,
  Button,
  Icon,
} from 'toolkit'

class DeviceBanner extends PureComponent {

  render() {

    const {
      brandName,
      image,
      deviceName,
      deviceId,
      color,
    } = this.props

    return (
      <section className='DeviceBanner'>
        <If cond={image}>
          <div className='DeviceBanner-image'>
            <img alt='' src={image} />
          </div>
        </If>
        <div>
          <h1 className='DeviceBanner-name'>{brandName}</h1>
          <p className='DeviceBanner-id'>
            <strong>{deviceName}</strong>
            <span>{' '}</span>
            <span>{deviceId}</span>
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
            />
          </div>
          
        </div>
      </section>
    )
  }
}

export default DeviceBanner
