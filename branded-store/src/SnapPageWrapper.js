import React from 'react'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import SnapPage from 'toolkit/SnapPage/SnapPage'
import ReviewList from 'toolkit/ReviewList/ReviewList'

export default function SnapPageWrapper({
  cardImgRootUrl,
  snap,
  onRequestInstall,
  onRequestRemove,
  onRequestSignin,
  onRequestAuthorize,
  onRequestConfirm,
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
        onRequestSignin={() => { onRequestSignin(snap.id) }}
        onRequestAuthorize={() => { onRequestAuthorize(snap.id) }}
        onRequestConfirm={() => { onRequestConfirm(snap.id) }}
        isInstalled={snap.status === 'installed'}
      >
        <ContentWrapper bordered>
          <ReviewList />
        </ContentWrapper>
      </SnapPage>
    </div>
  )
}
