import React from 'react'
import './ServicePage.css'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import Details from 'toolkit/SnapPage/SnapPageDetails'
import About from 'toolkit/SnapPage/SnapPageAbout'
import Interfaces from 'toolkit/SnapPage/SnapPageInterfaces'  
import Button from 'toolkit/Button/Button'
import History from './HistoryList'

import Summary from './ServicePageSummary'

function ServicePage(props) {

  const {
    service,
    cardImgRootUrl,
    isRunning,
    onRequestStop,
    onRequestStart,
    onRequestAdminPage,
  } = props

  if (!service) return null

  const icon = `${cardImgRootUrl}${service.id}.png`

  return (
    <div className='ServicePage'>

      <ContentWrapper background>
        <div className='ServicePage-header'>

          <div className='ServicePage-headerParts'>
            <div>
              <Summary
                icon={icon}
                name={service.name}
              />
            </div>
            <div className='ServicePage-buttonContainer'>
              <div className='ServicePage-button'>
                <Button
                  label={'Admin interface'}
                  disabled={!isRunning}
                  onClick={() => { onRequestAdminPage(service.id) }}
                />
              </div>
              <div className='ServicePage-button'>
                <Button
                  label={isRunning?'Stop':'Start'}
                  type={isRunning?'strong':'positive'}
                  onClick={() => { isRunning?onRequestStop(service.id):onRequestStart(service.id) }}
                />
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>

      <ContentWrapper>
          <div className='ServicePage-content'>

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
              <div className='ServicePage-ServicePageAbout'>
                <About
                  content={service.description}
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
          <History 
            history={service.history}
          />
        </ContentWrapper>
    </div>
  )
}

export default ServicePage
