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
                  label={'Open service'}
                />
              </div>
              <div className='SnapPage-button'>
                <Button
                  label={'Stop'}
                  type={'strong'}
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
                ['Category', 'Databases'],
                ['Size', '65.7MB'],
                ['Version', '3.7'],
                ['Channel', 'Stable'],
                ['Last run', '12 August 2016 12:37:06'],
              ]}
            />
            <div className='SnapPage-SnapPageAbout'>
              <SnapPageAbout
                content={'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.'}
              />
            </div>
          </div>

          <div>
            <SnapPageInterfaces
              items={[
                'Network',
                'Network Bind',
                'Mount Observe',
              ]}
            />
          </div>
        </div>
      </ContentWrapper>

      {props.children}

    </div>
  )
}

export default SnapPage
