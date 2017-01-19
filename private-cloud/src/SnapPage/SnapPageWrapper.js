import React from 'react'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import SnapPage from './SnapPage'
import HistoryList from './HistoryList/HistoryList'

export default function SnapPageWrapper({
  cardImgRootUrl,
  snap,
  onRequestStop,
  onRequestStart,
}) {

  if (!snap) return null

  const iconUrl = `${cardImgRootUrl}${snap.id}.png`

  return (
    <div className='App-snapPage'>
      <SnapPage
        snap={snap}
        icon={iconUrl}
        onRequestStop={() => { onRequestStop(snap.id) }}
        onRequestStart={() => { onRequestStart(snap.id) }}
        isRunning={snap.action === 'Running'}
      >
        <ContentWrapper bordered>
          <HistoryList />
        </ContentWrapper>
      </SnapPage>
    </div>
  )
}
