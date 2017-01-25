import React, { PureComponent } from 'react'
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

class Card extends PureComponent {

  onCardClick = () => {
    if (!this.props.onActionClick) {
      this.props.onClick()
    }
  }

  onMainClick = () => {
    if (this.props.onActionClick) {
      this.props.onClick()
    }
  }

  onActionClick = () => {
    if (this.props.onActionClick) {
      this.props.onActionClick()
    }
  }

  render() {

    const {
      children,
      positive,
      alignBottom,
      image,
      name,
      author,
      type,
      rating,
      action,
      installProgress,
    } = this.props

    const installing = installProgress !== -1
    // console.log(action)

    return (
      <div
        className={classes({
          'Card': true,
          'Card-positive': positive,
          'Card-alignBottom': alignBottom,
        })}
        role='button'
        onClick={this.onCardClick}
      >
        <div
          className='Card-main'
          onClick={this.onMainClick}
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
        <div
          className={classes({
            'Card-footer': true,
            'Card-footer-installing': installing,
          })}
        >
          {installing && (
            <div className='Card-footer-installProgress'>
              <ProgressBar progress={installProgress} />
            </div>
          )}
          <div className='Card-action-wrapper'>
            <div
              className='Card-action'
              onClick={this.onActionClick}
            >
              {
                action === 'open'? (
                  <a
                    role='button'
                  >
                    Open
                  </a>
                ) : action
              }
            </div>
          </div>
      </div>
    </div>
    )
  }
}

Card.propTypes = {
  name: React.PropTypes.string,
  rating: React.PropTypes.number,
  author: React.PropTypes.string,
  image: React.PropTypes.string,
  action: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onActionClick: React.PropTypes.func,
}

Card.defaultProps = {
  onClick: () => {},
  installProgress: -1,
}

export default Card
