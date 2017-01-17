import React from 'react'
import './Banner.css'

import photo from './photo.png'

export default function Banner(props) {
  return (
    <section className='Banner'>
      <div className='Banner-image'>
        <img
          alt=''
          src={props.photo || photo}
          width='140'
        />
      </div>
      <div>
        <h1 className='Banner-name'>{props.name}</h1>
        <p className='Banner-id'>{props.id}</p>
      </div>
    </section>
  )
}

