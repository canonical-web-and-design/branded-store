import React from 'react'
import './Banner.css'

import photo from './photo.png'

export default function Banner(props) {
  const primaryStyle = {}
  const secondaryStyle = {}

  if (props.primaryColor) primaryStyle.color = props.primaryColor
  if (props.secondaryColor) secondaryStyle.color = props.secondaryColor

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
        <h1 className='Banner-primaryText' style={primaryStyle}>{props.primaryText}</h1>
        <p className='Banner-secondaryText' style={secondaryStyle}>{props.secondaryText}</p>
      </div>
    </section>
  )
}

