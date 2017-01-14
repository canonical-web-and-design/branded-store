import React from 'react'
import './SnapPage.css'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import RatingStars from 'toolkit/RatingStars/RatingStars'

import SnapPageDetails from './SnapPageDetails'
import SnapPageAbout from './SnapPageAbout'
import SnapPageInterfaces from './SnapPageInterfaces'
import SnapPageInstallButton from './SnapPageInstallButton'

function SnapPage(props) {
  const { snap, icon, installProgress } = props
  return snap? (
    <div className='SnapPage'>

      <ContentWrapper background>
        <div className='SnapPage-header'>

          <div className='SnapPage-headerParts'>
            <div>
              <div className='SnapPage-summary'>
                <img
                  className='SnapPage-icon'
                  src={icon}
                  alt=''
                  width='114'
                  height='114'
                />
                <div>
                  <h1 className='SnapPage-name'>{snap.name}</h1>
                  <p className='SnapPage-author'>By {snap.author}</p>
                  <RatingStars />
                </div>
              </div>
              <div className='SnapPage-tags'>
                <p>
                  {['databases', 'cassandra', 'app-deployment'].map((tagname, i) => (
                    <span key={i}>
                      {i? <span>{', '}</span> : null}
                      <a role='button'>{tagname}</a>
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className='SnapPage-installButton'>
              <SnapPageInstallButton
                label={'Free'}
                installProgress={installProgress}
                snapId={snap.id}
                onRequestInstall={props.onRequestInstall}
                isInstalled={props.isInstalled}
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
  ) : null
}

SnapPage.propTypes = {
  snap: React.PropTypes.object,
}

SnapPage.defaultProps = {
  snap: undefined,
}

export default SnapPage
