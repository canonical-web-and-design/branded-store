import React from 'react'

import {
  ContentWrapper,
  CardsList,
} from 'toolkit'

import DeviceBanner from '../DeviceBanner/DeviceBanner'

const publicUrl = process.env.PUBLIC_URL

export default function HomePage({
  brandData,
  snaps,
  cardImgRootUrl,
  onOpenSnap,
}) {

  const addCard = {
    id: 'add',
    name: 'Add more snaps for this device',
    action: 'Browse store',
    image: 'add-snap',
  }

  const cards = [
    ...snaps
    // store the index to keep the sorting order
    .map((snap, i) => [i, snap])
    .sort((a, b) => {
      if (a[1].type === '') return -1
      if (b[1].type === '') return 1
      return a[0] - b[0]
    })
    // back to objects
    .map(s => s[1]),
    addCard
  ]

  const photo = brandData.id? (
    `${publicUrl}/brands/${brandData.id}/banner-photo.jpg`
  ) : ''

  return (
    <div>
      <ContentWrapper>
        <DeviceBanner
          image={photo}
          brandName={brandData.brandName}
          deviceName={brandData.deviceName}
          deviceId={brandData.deviceName2}
          color={brandData.color2 || brandData.color}
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
