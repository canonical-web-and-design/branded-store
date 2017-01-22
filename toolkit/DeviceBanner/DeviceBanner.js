import React from 'react'
import './DeviceBanner.css'

import Link from 'toolkit/Link/Link'
import photo from './photo.jpg'

export default function DeviceBanner(props) {
  const idParts = props.id.split(' ')
  return (
    <section className='DeviceBanner'>
      <div className='DeviceBanner-image'>
        <img
          alt=''
          src={props.photo || photo}
          width='232'
        />
      </div>
      <div>
        <h1 className='DeviceBanner-name'>{props.name}</h1>
        <p className='DeviceBanner-id'>
          <strong>{idParts[0]}</strong>
          <span>{' ' + idParts.slice(1).join(' ')}</span>
        </p>
        <p>
          <Link
            label='Developer documentation'
            color={props.color}
            external={true}
          />
        </p>
      </div>
    </section>
  )
}

