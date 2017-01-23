import React from 'react'
import './ServicePage.css'

import If from 'toolkit/If'
import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import Details from 'toolkit/SnapPage/SnapPageDetails'
import About from 'toolkit/SnapPage/SnapPageAbout'
import Interfaces from 'toolkit/SnapPage/SnapPageInterfaces'
import Button from 'toolkit/Button/Button'
import Summary from 'toolkit/SnapPage/SnapPageSummary'

import History from './HistoryList'

function ServicePage(props) {

  const {
    service,
    cardImgRootUrl,
    isRunning,
    onRequestStop,
    onRequestStart,
    onRequestAdminPage,
    onRequestServicePage,
  } = props

  if (!service) return null

  const icon = `${cardImgRootUrl}${service.image}.png`
  const runningStatusText = isRunning?'running':'stopped'
  const hasButtonToStopService = false
  const hasButtonToOpenService = true

  return (
    <div className='ServicePage'>

      <ContentWrapper background>
        <div className='ServicePage-header'>

          <div className='ServicePage-headerParts'>
            <div>
              <Summary
                icon={icon}
                name={service.name}
                description={'This service has been ' + runningStatusText + ' since ' + service.history[0][1]} 
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
              <If cond={hasButtonToOpenService}>
                <div className='ServicePage-button'>
                  <Button
                    label={'Open'}
                    disabled={!isRunning}
                    onClick={() => { onRequestServicePage(service.id) }}
                  />
                </div>
              </If>
              <If cond={hasButtonToStopService}>
                <div className='ServicePage-button'>
                  <Button
                  label={isRunning?'Stop':'Start'}
                  disabled={false}
                  onClick={() => { isRunning?onRequestStop(service.id):onRequestStart(service.id) }}
                />
                </div>
              </If>
            </div>
          </div>
        </div>
      </ContentWrapper>

      <ContentWrapper>
          <div className='ServicePage-content'>

            <div>
              <If cond={service.details}>
                <Details
                  items={service.details}
                />
              </If>
              <div className='ServicePage-ServicePageAbout'>
                <About
                  content={service.description}
                />
              </div>
            </div>

            <div>
              <If cond={service.interfaces}>
                <Interfaces
                  items={service.interfaces}
                />
              </If>
            </div>

          </div>
        </ContentWrapper>
        <ContentWrapper bordered>
          <History 
            items={service.history}
          />
        </ContentWrapper>
    </div>
  )
}

export default ServicePage
