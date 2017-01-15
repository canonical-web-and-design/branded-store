import React from 'react'
import './SnapPageSummary.css'

import RatingStars from 'toolkit/RatingStars/RatingStars'

export default function SnapPageSummary({ icon, name, author }) {
  return (
    <div className='SnapPagesummary'>
      <img
        className='SnapPageSummary-icon'
        src={icon}
        alt=''
        width='114'
        height='114'
      />
      <div>
        <h1 className='SnapPageSummary-name'>{name}</h1>
        <p className='SnapPageSummary-author'>By {author}</p>
        <RatingStars />
      </div>
    </div>

  )
}
