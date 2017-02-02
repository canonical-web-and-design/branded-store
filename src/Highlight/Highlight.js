import React, { PureComponent } from 'react'

import image from './image.png'

export default class Highlight extends PureComponent {
  render() {
    return (
      <img
        alt=''
        src={image}
        style={{ display: 'block', width: '100%' }}
      />
    )
  }
}
