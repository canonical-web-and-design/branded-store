import React from 'react'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import Banner from './Banner/Banner'
import CardsList from 'toolkit/CardsList/CardsList'

const publicUrl =  process.env.PUBLIC_URL

const bannerData = {
  photo: 'banner-photo.png', 
  deviceName: 'Self-hosted private cloud suite',
  deviceId: 'An Ubuntu snap-based solution for forward-thinking enterprises to own and control their own data.',
}

export default function HomePage({
  services,
  cardImgRootUrl,
  onOpenService,
}) {

  return (
    <div>
      <ContentWrapper>
        <Banner
          photo={`${publicUrl}/${bannerData.photo}`}
          name={bannerData.deviceName}
          id={bannerData.deviceId}
        />
      </ContentWrapper>
      <ContentWrapper background bordered>
        <CardsList
          title='All Services'
          cards={services}
          cardImgRootUrl={cardImgRootUrl}
          onCardClick={onOpenService}
        />
      </ContentWrapper>
    </div>
  )
}
