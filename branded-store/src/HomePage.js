import React from 'react'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import DeviceBanner from 'toolkit/DeviceBanner/DeviceBanner'
import CardsList from 'toolkit/CardsList/CardsList'

const publicUrl = process.env.PUBLIC_URL

export default function HomePage({
  brandData,
  snaps,
  cardImgRootUrl,
  onOpenSnap,
}) {

  const cards = snaps.concat([{
    id: 'add',
    name: 'Add more snaps for this device',
    action: 'Browse store',
    image: 'add-snap',
  }])

  const photo = brandData.id? (
    `${publicUrl}/brands/${brandData.id}/banner-photo.jpg`
  ) : ''

  return (
    <div>
      <ContentWrapper>
        <DeviceBanner
          photo={photo}
          name={brandData.deviceName}
          id={brandData.deviceId}
        />
      </ContentWrapper>
      <ContentWrapper background bordered>
        <CardsList
          title='Installed Snaps'
          cards={cards}
          cardImgRootUrl={cardImgRootUrl}
          onCardClick={onOpenSnap}
        />
      </ContentWrapper>
    </div>
  )
}
