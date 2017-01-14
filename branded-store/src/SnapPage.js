import React from 'react'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import SnapPageToolkit from 'toolkit/SnapPage/SnapPage'
import ReviewList from 'toolkit/ReviewList/ReviewList'

export default function SnapPage({
  cardImgRootUrl,
  snap,
  onRequestInstall,
  installing,
  installedSnaps,
}) {
  const installProgressItem = installing.find(
    item => item.id === snap.id
  )
  let progress = (
    installProgressItem
    ? installProgressItem.progress
    : 0
  )

  const isInstalled = snap && (
    installedSnaps.findIndex(snap => snap.id === snap.id) > -1
  )

  const iconUrl = `${cardImgRootUrl}${snap && snap.id}.png`

  return (
    <div className='App-snapPage'>
      <SnapPageToolkit
        snap={snap}
        installProgress={progress}
        icon={iconUrl}
        onRequestInstall={onRequestInstall}
        isInstalled={isInstalled}
      >
        <ContentWrapper bordered>
          <ReviewList />
        </ContentWrapper>
      </SnapPageToolkit>
    </div>
  )
}
