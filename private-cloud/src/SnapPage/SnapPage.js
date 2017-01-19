import React from 'react'
import './SnapPage.css'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import SnapPageDetails from 'toolkit/SnapPage/SnapPageDetails'
import SnapPageAbout from 'toolkit/SnapPage/SnapPageAbout'
import SnapPageInterfaces from 'toolkit/SnapPage/SnapPageInterfaces'  
import Button from 'toolkit/Button/Button'

import SnapPageSummary from './SnapPageSummary'

function SnapPage(props) {

  const {
    snap,
    icon,
    isRunning,
    onRequestStop,
    onRequestStart,
  } = props

  if (!snap) return null

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
                />
              </div>
              <div className='SnapPage-button'>
                <Button
                  label={isRunning?'Stop':'Start'}
                  type={isRunning?'strong':'positive'}
                  onClick={isRunning?onRequestStop:onRequestStart}
                />
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>

      <ContentWrapper>
        <div className='SnapPage-content'>

          <div>
            <SnapPageDetails
              items={[
                ['Size', '65.7MB'],
                ['Version', '3.7'],
              ]}
            />
            <div className='SnapPage-SnapPageAbout'>
              <SnapPageAbout
                content={snap.about}
              />
            </div>
          </div>
          <div>
          </div>
        </div>
      </ContentWrapper>

      {props.children}

    </div>
  )
}

export default SnapPage
