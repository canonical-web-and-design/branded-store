import React from 'react'
import './ServicePageSummary.css'

export default function ServicePageSummary({ icon, name, author }) {
  return (
    <div className='ServicePageSummary'>
      <img
        className='ServicePageSummary-icon'
        src={icon}
        alt=''
        width='114'
        height='114'
      />
      <div>
        <h1 className='ServicePageSummary-name'>{name}</h1>
      </div>
    </div>

  )
}
