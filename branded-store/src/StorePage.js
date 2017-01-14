import React from 'react'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import CardsList from 'toolkit/CardsList/CardsList'

export default function StorePage({
  featuredSnaps,
  cardImgRootUrl,
  onOpenSnap,
}) {
  return (
    <ContentWrapper>
      <div className='App-store'>
        <CardsList
          title='Featured Snaps'
          cards={featuredSnaps}
          cardImgRootUrl={cardImgRootUrl}
          onCardClick={onOpenSnap}
        />
      </div>
    </ContentWrapper>
  )
}
