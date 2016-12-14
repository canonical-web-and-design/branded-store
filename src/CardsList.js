import React from 'react'
import './CardsList.css'

import Card from './Card'

function CardsList(props) {
  return (
    <div className='CardsList'>
      {props.cards.map((card, i) => (
        <Card
          key={i}
          image={card.image}
          name={card.name}
          author={card.author}
          action={card.action}
        />
      ))}
    </div>
  )
}

export default CardsList
