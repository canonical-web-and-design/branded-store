import React, { PureComponent } from 'react'

import {
  ContentWrapper,
  CardsList,
} from 'toolkit'

import SnapsTable from '../SnapsTable/SnapsTable'
import DeviceBanner from '../DeviceBanner/DeviceBanner'

const pub = process.env.PUBLIC_URL

function snapToCard(snap) {
  return {
    id: snap.id,
    name: snap.name,
    author: snap.author,
    type: snap.type === 'Snap'? '' : snap.type,
    action: snap.status === 'installing'? 'Installing' : null,
    image: snap.id,
    installProgress: (
      snap.status === 'installing'
        ? snap.installProgress
        : -1
    ),
    snap: snap,
    iconUrl: snap.iconUrl,
  }
}

export default class HomePage extends PureComponent {

  render() {

    const {
      brandData,
      snaps,
      onOpenSnap,
      onOpenSettings,
      onOpenDocumentation,
    } = this.props

    const addCard = {
      id: 'add',
      name: 'Get more apps',
      action: 'Store',
      image: 'add-snap',
      iconUrl: `${pub}/icons/cards/add-snap.png`,
    }

    const photo = brandData.id? (
      `${pub}/brand-settings/brand/product.png`
    ) : ''

    const installedSnaps = snaps.filter(snap => !snap.systemSnap)
    const systemSnaps = snaps.filter(snap => snap.systemSnap)

    const cards = [
      ...installedSnaps.map(snapToCard)
      // store the index to keep the sorting order
      .map((snap, i) => [i, snap])
      .sort((a, b) => {
        if (a[1].type === 'Snap') return -1
        if (b[1].type === 'Snap') return 1
        return a[0] - b[0]
      })
      // back to objects
      .map(s => s[1]),
      addCard,
    ]


    return (
      <div>
        <ContentWrapper>
          <DeviceBanner
            image={photo}
            brandName={brandData.brandName}
            deviceName={brandData.deviceName}
            deviceId={brandData.systemName}
            color={brandData.color}
            onSettingsClick={onOpenSettings}
            onDocumentationClick={onOpenDocumentation}
          />
        </ContentWrapper>

        <ContentWrapper background bordered>

          <CardsList
            title='Apps installed'
            cards={cards}
            onCardClick={onOpenSnap}
          />

          <div style={{ paddingBottom: '100px' }}>
            <SnapsTable
              title='System'
              snaps={systemSnaps.map(snap => ({
                id: snap.id,
                name: snap.name,
                author: snap.author,
                category: snap.category,
                icon: `${pub}/icons/cards/${snap.id}.png`,
              }))}
              onOpenSnap={onOpenSnap}
            />
          </div>
        </ContentWrapper>
      </div>
    )
  }
}
