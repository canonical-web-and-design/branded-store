import React from 'react'
import stars from './rating-stars.png'
import starsColor from './rating-stars-color.png'

export default function RatingStars(props) {
  const src = props.color? starsColor : stars
  const size = props.color? [290/2, 42/2] : [104, 18]
  return (
    <img
      className='Card-rating'
      src={src}
      alt=''
      width={size[0]}
      height={size[1]}
    />
  )
}
