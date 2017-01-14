import React from 'react'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import DeviceBanner from 'toolkit/DeviceBanner/DeviceBanner'
import CardsList from 'toolkit/CardsList/CardsList'

export default function HomePage({
  brandData,
  installedSnaps,
  cardImgRootUrl,
  onOpenSnap,
}) {
  return (
    <div>
      <ContentWrapper>
        <DeviceBanner
          name={brandData.deviceName}
          id={brandData.deviceId}
        />
      </ContentWrapper>
      <ContentWrapper background bordered>
        <div className='App-installedSnaps'>
          <CardsList
            title='Installed Snaps'
            cards={installedSnaps}
            cardImgRootUrl={cardImgRootUrl}
            onCardClick={onOpenSnap}
          />
        </div>
      </ContentWrapper>
    </div>
  )
}
