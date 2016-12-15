import React from 'react'
import './Card.css'
import stars from './Card/rating-stars.png'

const publicUrl = process.env.PUBLIC_URL

function Card(props) {
  const iconUrl = `${publicUrl}/icons/cards/${props.image}.png`
  return (
    <div className='Card'>
      <img className='Card-icon' src={iconUrl} alt='' width='114' height='114' />
      <p className='Card-name'>{props.name}</p>
      <p className='Card-author'>By {props.author}</p>
      <img className='Card-rating' src={stars} alt='' width='104' height='18' />
      <div className='Card-footer'>
        <div className='Card-action'>{props.action}</div>
      </div>
    </div>
  )
}

export default Card
