import React from 'react'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import SnapPage from './SnapPage'
import HistoryList from './HistoryList/HistoryList'

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
          <HistoryList />
        </ContentWrapper>
      </SnapPage>
    </div>
  )
}
