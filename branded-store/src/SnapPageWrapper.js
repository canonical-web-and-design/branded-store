import React from 'react'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import SnapPage from 'toolkit/SnapPage/SnapPage'
import ReviewList from 'toolkit/ReviewList/ReviewList'

export default function SnapPageWrapper({
  cardImgRootUrl,
  snap,
  onRequestInstall,
  onRequestRemove,
}) {

  if (!snap) return null

  const installProgress = (
    snap.status === 'installing'? snap.installProgress : 0
  )

  const iconUrl = `${cardImgRootUrl}${snap.id}.png`

  return (
    <div className='App-snapPage'>
      <SnapPage
        snap={snap}
        installProgress={installProgress}
        icon={iconUrl}
        onRequestInstall={onRequestInstall}
        onRequestRemove={onRequestRemove}
        isInstalled={snap.status === 'installed'}
      >
        <ContentWrapper bordered>
          <ReviewList />
        </ContentWrapper>
      </SnapPage>
    </div>
  )
}
