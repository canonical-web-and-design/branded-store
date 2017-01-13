import React from 'react'
import stars from './rating-stars.png'
import starsColor from './rating-stars-color.png'

export default function RatingStars(props) {
  const src = props.color? starsColor : stars
  return (
    <img
      className='Card-rating'
      src={src}
      alt=''
      width='104'
      height='18'
    />
  )
}
