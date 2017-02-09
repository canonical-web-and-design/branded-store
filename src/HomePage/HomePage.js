import React, { PureComponent } from 'react'

import {
  ContentWrapper,
  CardsList,
} from 'toolkit'

import SnapsTable from '../SnapsTable/SnapsTable'
import DeviceBanner from '../DeviceBanner/DeviceBanner'

const publicUrl = process.env.PUBLIC_URL

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
  }
}

export default class HomePage extends PureComponent {

  render() {

    const {
      brandData,
      snaps,
      cardImgRootUrl,
      onOpenSnap,
      onOpenSettings,
    } = this.props

    const addCard = {
      id: 'add',
      name: 'Add new snaps to this device',
      action: 'Store',
      image: 'add-snap',
    }


    const photo = brandData.id? (
      `${publicUrl}/brands/${brandData.id}/banner-photo.jpg`
    ) : ''

    const SYSTEM_SNAP_TYPES = ['OS snap', 'Kernel snap', 'Device manager']

    const installedSnaps = snaps.filter(snap => !SYSTEM_SNAP_TYPES.includes(snap.type))
    const systemSnaps = snaps.filter(snap => SYSTEM_SNAP_TYPES.includes(snap.type))

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
            deviceId={brandData.deviceName2}
            color={brandData.color2 || brandData.color}
            onSettingsClick={onOpenSettings}
          />
        </ContentWrapper>

        <ContentWrapper background bordered>

          <CardsList
            title='Installed'
            cards={cards}
            cardImgRootUrl={cardImgRootUrl}
            onCardClick={onOpenSnap}
          />

          <div style={{ paddingBottom: '100px' }}>
            <SnapsTable
              title='System'
              snaps={systemSnaps.map(snap => ({
                id: snap.id,
                name: snap.name,
                author: snap.author,
                category: snap.type,
                icon: `${publicUrl}/icons/cards/${snap.id}.png`,
              }))}
              onOpenSnap={onOpenSnap}
            />
          </div>
        </ContentWrapper>
      </div>
    )
  }
}
