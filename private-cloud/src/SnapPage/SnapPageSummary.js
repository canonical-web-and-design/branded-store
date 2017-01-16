import React from 'react'
import './SnapPageSummary.css'

export default function SnapPageSummary({ icon, name, author }) {
  return (
    <div className='SnapPageSummary'>
      <img
        className='SnapPageSummary-icon'
        src={icon}
        alt=''
        width='114'
        height='114'
      />
      <div>
        <h1 className='SnapPageSummary-name'>{name}</h1>
      </div>
    </div>

  )
}
