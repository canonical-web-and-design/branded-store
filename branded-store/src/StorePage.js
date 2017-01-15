import React from 'react'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import CardsList from 'toolkit/CardsList/CardsList'

const publicUrl = process.env.PUBLIC_URL

export default function StorePage({
  featuredSnaps,
  cardImgRootUrl,
  onOpenSnap,
}) {
  return (
    <ContentWrapper>
      <div className='App-store'>
        <img
          style={{
            width: '100%',
            marginTop: '20px',
            marginBottom: '40px',
          }}
          src={`${publicUrl}/search-field.png`}
          alt='Search Field placeholder'
        />
        <CardsList
          title='Featured Snaps'
          separator={true}
          cards={featuredSnaps}
          cardImgRootUrl={cardImgRootUrl}
          onCardClick={onOpenSnap}
        />
      </div>
    </ContentWrapper>
  )
}
