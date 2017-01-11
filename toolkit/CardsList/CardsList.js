import React from 'react'
import './CardsList.css'

import Card from 'toolkit/Card/Card'

function CardsList({ title, cards, cardImgUrl }) {
  return (
    <div className='CardsList'>
      <div className='CardsList-title'>{title}</div>
      <div className='CardsList-content'>
        {cards.map((card, i) => (
          <Card
            key={i}
            name={card.name}
            author={card.author}
            action={card.action}
            image={`${cardImgUrl}${card.image}.png`}
          />
        ))}
      </div>
    </div>
  )
}

export default CardsList
