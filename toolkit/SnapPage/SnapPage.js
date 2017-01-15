import React from 'react'
import './SnapPage.css'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'

import SnapPageSummary from './SnapPageSummary'
import SnapPageTags from './SnapPageTags'
import SnapPageDetails from './SnapPageDetails'
import SnapPageAbout from './SnapPageAbout'
import SnapPageInterfaces from './SnapPageInterfaces'
import SnapPageInstallButton from './SnapPageInstallButton'

function SnapPage(props) {

  const {
    snap,
    icon,
    installProgress,
    onRequestInstall,
    onRequestRemove,
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
                author={snap.author}
              />
              <SnapPageTags
                tags={['databases', 'cassandra', 'app-deployment']}
              />
            </div>
            <div className='SnapPage-installButton'>
              <SnapPageInstallButton
                priceLabel={'Free'}
                installProgress={installProgress}
                status={snap.status}
                snapId={snap.id}
                onRequestInstall={onRequestInstall}
                onRequestRemove={onRequestRemove}
              />
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
                ['Updated', '12 August 2016 12:37:06'],
              ]}
            />
            <div className='SnapPage-SnapPageAbout'>
              <SnapPageAbout
                content={snap.description}
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
