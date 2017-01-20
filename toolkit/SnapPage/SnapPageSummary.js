import React from 'react'
import './SnapPageSummary.css'

import If from 'toolkit/If'
import RatingStars from 'toolkit/RatingStars/RatingStars'

export default function SnapPageSummary({ icon, name, author, description, rating }) {
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
        <If cond={author}>
          <p className='SnapPageSummary-author'>By {author}</p>
        </If>
        <If cond={rating >= 0}>
          <RatingStars />
        </If>
        <If cond={description}>
          <p className='SnapPageSummary-description'>{description}</p>
        </If>
      </div>
    </div>

  )
}
