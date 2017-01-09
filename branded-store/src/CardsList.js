import React from 'react'
import './CardsList.css'

import Card from './Card'

function CardsList({ title, cards }) {
  return (
    <div className='CardsList'>
      <div className='CardsList-title'>{title}</div>
      <div className='CardsList-content'>
        {cards.map((card, i) => (
          <Card
            key={i}
            image={card.image}
            name={card.name}
            author={card.author}
            action={card.action}
          />
        ))}
      </div>
    </div>
  )
}

export default CardsList
