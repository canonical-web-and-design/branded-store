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

  const cards = installedSnaps.concat([{
    id: 'add',
    name: 'Add more snaps for this device',
    action: 'Browse store',
    image: 'add-snap',
  }])

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
            cards={cards}
            cardImgRootUrl={cardImgRootUrl}
            onCardClick={onOpenSnap}
          />
        </div>
      </ContentWrapper>
    </div>
  )
}
