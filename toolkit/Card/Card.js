import React from 'react'
import './Card.css'

import classes from 'toolkit/classes'
import RatingStars from 'toolkit/RatingStars/RatingStars'

export function CardIcon({ image }) {
  return (
    <img
      className='Card-icon'
      src={image}
      alt=''
      width='114'
      height='114'
    />
  )
}

export function CardName({ name }) {
  return (
    <p className='Card-name'>{name}</p>
  )
}

export function CardAuthor({ name }) {
  return (
    <p className='Card-author'>By {name}</p>
  )
}

function Card(props) {
  return (
    <div
      className={classes({
        'Card': true,
        'Card-positive': props.positive,
        'Card-alignBottom': props.alignBottom,
      })}
      role='button'
      onClick={props.onClick}
    >
      <div
        className='Card-main'
      >
        <CardIcon
          image={props.image}
        />
        {props.children || (
          <div className='Card-content'>
            <div>
              <CardName
                name={props.name}
              />
            </div>
            {props.author? (
              <div>
                <CardAuthor
                  name={props.author}
                />
              </div>
            ) : null}
            {props.type? (
              <div style={{ color: '#888888', fontWeight: '400' }}>{props.type}</div>
            ) : null}
            {props.rating? (
              <div>
                <RatingStars />
              </div>
            ) : null}
          </div>
        )}
      </div>
      <div className='Card-footer'>
        <div className='Card-action'>{props.action}</div>
      </div>
    </div>
  )
}

Card.propTypes = {
  name: React.PropTypes.string,
  rating: React.PropTypes.number,
  author: React.PropTypes.string,
  image: React.PropTypes.string,
  action: React.PropTypes.string,
  onClick: React.PropTypes.func,
}

Card.defaultProps = {
  onClick: () => {},
}

export default Card
