import React from 'react'
import stars from './rating-stars.png'

export default function RatingStars(props) {
  return (
    <img
      className='Card-rating'
      src={stars}
      alt=''
      width='104'
      height='18'
    />
  )
}
