import React from 'react'
import './Card.css'

import classes from 'toolkit/classes'
import RatingStars from 'toolkit/RatingStars/RatingStars'
import ProgressBar from 'toolkit/ProgressBar/ProgressBar'

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

function Card({
  children,
  positive,
  alignBottom,
  onClick,
  image,
  name,
  author,
  type,
  rating,
  installProgress = -1,
  action,
}) {
  const installing = installProgress !== -1
  return (
    <div
      className={classes({
        'Card': true,
        'Card-positive': positive,
        'Card-alignBottom': alignBottom,
      })}
      role='button'
      onClick={onClick}
    >
      <div
        className='Card-main'
      >
        <CardIcon
          image={image}
        />
        {children || (
          <div className='Card-content'>
            <div>
              <CardName
                name={name}
              />
            </div>
            {author? (
              <div>
                <CardAuthor
                  name={author}
                />
              </div>
            ) : null}
            {type? (
              <div style={{ color: '#888888', fontWeight: '400' }}>{type}</div>
            ) : null}
            {rating? (
              <div>
                <RatingStars />
              </div>
            ) : null}
          </div>
        )}
      </div>
      <div className={classes({
        'Card-footer': true,
        'Card-footer-installing': installing,
      })}>
        {installing && (
          <div className='Card-footer-installProgress'>
            <ProgressBar progress={installProgress} />
          </div>
        )}
        <div className='Card-action'>{action}</div>
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
