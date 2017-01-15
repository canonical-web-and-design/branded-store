import React from 'react'
import './Card.css'

import RatingStars from 'toolkit/RatingStars/RatingStars'

function Card(props) {
  return (
    <div
      className='Card'
      role='button'
      onClick={props.onClick}
    >
      <div
        className='Card-main'
      >
        <img
          className='Card-icon'
          src={props.image}
          alt=''
          width='114'
          height='114'
        />
        <p className='Card-name'>{props.name}</p>
        <p className='Card-author'>By {props.author}</p>
        <RatingStars />
      </div>
      <div className='Card-footer'>
        <div className='Card-action'>{props.action}</div>
      </div>
    </div>
  )
}

Card.propTypes = {
  name: React.PropTypes.string,
  author: React.PropTypes.string,
  image: React.PropTypes.string,
  action: React.PropTypes.string,
  onClick: React.PropTypes.func,
}

Card.defaultProps = {
  name: 'Card Title',
  author: 'Author Name',
  image: '',
  action: 'Action',
  onClick: () => {},
}

export default Card
