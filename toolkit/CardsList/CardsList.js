import React, { Component } from 'react'
import './CardsList.css'

import Card from 'toolkit/Card/Card'

class CardWrapper extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }
  onClick() {
    this.props.onClick(this.props.card.id)
  }
  render() {
    const { card, image } = this.props
    const { name, author, action } = card
    return(
      <Card
        name={name}
        author={author}
        action={action}
        image={image}
        onClick={this.onClick}
      />
    )
  }
}

class CardsList extends Component {
  constructor(props) {
    super(props)
    this.onCardClick = this.onCardClick.bind(this)
  }

  onCardClick(id) {
    this.props.onCardClick(id)
  }

  render() {
    const {
      title,
      cards,
      cardImgUrl,
    } = this.props
    return (
      <div className='CardsList'>
        <div className='CardsList-title'>{title}</div>
        <div className='CardsList-content'>
          {cards.map((card, i) => (
            <CardWrapper
              key={card.id}
              card={card}
              image={`${cardImgUrl}${card.image}.png`}
              onClick={this.onCardClick}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default CardsList
