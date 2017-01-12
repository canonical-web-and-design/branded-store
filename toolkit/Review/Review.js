import React from 'react'
import './Review.css'

import RatingStars from 'toolkit/RatingStars/RatingStars'
import defaultAvatar from './default-avatar.png'

export default function Review({
  author,
  image = defaultAvatar,
  rating,
  date,
  content,
}) {
  return (
    <div className='Review'>

      <div className='Review-rating'>
        <RatingStars color />
      </div>

      <div className='Review-content'>

        <img
          className='Review-image'
          src={image || ''}
          alt=''
          width='62'
          height='62'
        />

        <div className='Review-text'>
          <div className='Review-metas'>
            <div className='Review-author'><strong>{author}</strong></div>
            <div className='Review-date'>{date}</div>
          </div>
          <div>{content}</div>
        </div>
      </div>

    </div>
  )
}

Review.PropTypes = {
  author: React.PropTypes.string,
  image: React.PropTypes.string,
  rating: React.PropTypes.number,
  date: React.PropTypes.string,
  content: React.PropTypes.string,
}

