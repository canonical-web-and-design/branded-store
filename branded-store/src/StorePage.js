import React from 'react'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import CardsList from 'toolkit/CardsList/CardsList'

const publicUrl = process.env.PUBLIC_URL

export default function StorePage({
  featuredSnaps,
  cardImgRootUrl,
  onOpenSnap,
}) {

  const header = (
    <div>
      <div style={{
        display: 'flex',
        marginTop: '25px',
        marginBottom: '20px',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <h1 style={{ fontSize: '24px' }}>
          Featured Snaps
        </h1>
        <p style={{ fontSize: '16px' }}>
        {[
          'databases',
          'network',
          'robotics',
          'home',
          'private',
        ].map(tag => (
          <span key={tag}>
            <a role='button'>{tag}</a>
            <span>{' '}</span>
          </span>
        ))}
        </p>
      </div>
      <div style={{
        width: '100%',
        height: '0',
        marginTop: '20px',
        borderBottom: '1px dotted #D2D2D2',
      }} />
    </div>
  )

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
          cards={featuredSnaps}
          cardImgRootUrl={cardImgRootUrl}
          onCardClick={onOpenSnap}
          header={header}
        />
      </div>
    </ContentWrapper>
  )
}
