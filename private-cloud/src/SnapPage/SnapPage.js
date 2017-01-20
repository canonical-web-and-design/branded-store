import React from 'react'
import './SnapPage.css'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import Details from 'toolkit/SnapPage/SnapPageDetails'
import About from 'toolkit/SnapPage/SnapPageAbout'
import Interfaces from 'toolkit/SnapPage/SnapPageInterfaces'  
import Button from 'toolkit/Button/Button'
import HistoryList from './HistoryList/HistoryList'

import SnapPageSummary from './SnapPageSummary'

function SnapPage(props) {

  const {
    snap,
    cardImgRootUrl,
    isRunning,
    onRequestStop,
    onRequestStart,
    onRequestAdminPage,
  } = props

  if (!snap) return null

  const icon = `${cardImgRootUrl}${snap.id}.png`

  return (
    <div className='SnapPage'>

      <ContentWrapper background>
        <div className='SnapPage-header'>

          <div className='SnapPage-headerParts'>
            <div>
              <SnapPageSummary
                icon={icon}
                name={snap.name}
              />
            </div>
            <div className='SnapPage-buttonContainer'>
              <div className='SnapPage-button'>
                <Button
                  label={'Admin interface'}
                  disabled={!isRunning}
                  onClick={() => { onRequestAdminPage(snap.id) }}
                />
              </div>
              <div className='SnapPage-button'>
                <Button
                  label={isRunning?'Stop':'Start'}
                  type={isRunning?'strong':'positive'}
                  onClick={() => { isRunning?onRequestStop(snap.id):onRequestStart(snap.id) }}
                />
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>

      <ContentWrapper>
          <div className='SnapPage-content'>

            <div>
              <Details
                items={[
                  ['Category', 'Databases'],
                  ['Size', '65.7MB'],
                  ['Version', '3.7'],
                  ['Channel', 'Stable'],
                  ['Updated', '12 August 2016 12:37:06'],
                ]}
              />
              <div className='SnapPage-SnapPageAbout'>
                <About
                  content={snap.description}
                />
              </div>
            </div>

            <div>
              <Interfaces
                items={[
                  'Network',
                  'Network Bind',
                  'Mount Observe',
                ]}
              />
            </div>

          </div>
        </ContentWrapper>
        <ContentWrapper bordered>
          <HistoryList 
            history={snap.history}
          />
        </ContentWrapper>
    </div>
  )
}

export default SnapPage
