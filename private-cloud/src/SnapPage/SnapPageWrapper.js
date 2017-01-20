import React from 'react'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import SnapPage from './SnapPage'
import HistoryList from './HistoryList/HistoryList'

export default function SnapPageWrapper({
  cardImgRootUrl,
  snap,
  onRequestStop,
  onRequestStart,
  onRequestAdminPage,
}) {

  if (!snap) return null

  const iconUrl = `${cardImgRootUrl}${snap.id}.png`

  return (
    <div className='App-snapPage'>
      <SnapPage
        snap={snap}
        icon={iconUrl}
        isRunning={snap.action === 'Running'}
        onRequestStop={() => { onRequestStop(snap.id) }}
        onRequestStart={() => { onRequestStart(snap.id) }}
        onRequestAdminPage={() => { onRequestAdminPage(snap.id) }}
      >
        <ContentWrapper bordered>
          <HistoryList 
            history={snap.history}
          />
        </ContentWrapper>
      </SnapPage>
    </div>
  )
}
