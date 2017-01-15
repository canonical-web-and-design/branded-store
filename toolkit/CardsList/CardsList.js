import React, { Component } from 'react'
import './CardsList.css'

import Card from 'toolkit/Card/Card'

class CardWrapper extends Component {

  onClick = () => {
    this.props.onClick(this.props.card.id)
  }

  render() {
    const { card, image } = this.props
    const { name, author, action, rating, id } = card
    return (
      <Card
        name={name}
        author={author}
        action={action}
        image={image}
        onClick={this.onClick}
        rating={rating}
        positive={id === 'add'}
        alignBottom={id === 'add'}
      />
    )
  }
}

class CardsList extends Component {

  onCardClick = (id) => {
    this.props.onCardClick(id)
  }

  render() {
    const {
      title,
      cards,
      cardImgRootUrl,
    } = this.props
    return (
      <div className='CardsList'>
        <div className='CardsList-title'>{title}</div>
        <div className='CardsList-content'>
          {cards.map((card, i) => (
            <CardWrapper
              key={card.id + i}
              card={card}
              image={`${cardImgRootUrl}${card.image}.png`}
              onClick={this.onCardClick}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default CardsList
