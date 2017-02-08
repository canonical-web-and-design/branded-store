import React, { Component } from 'react'
import './SnapPage.css'

import {
  If,
  ContentWrapper,
  ReviewList,
  SnapPageSummary as Summary,
  SnapPageTags as Tags,
  SnapPageDetails as Details,
  SnapPageAbout as About,
  SnapPageInterfaces as Interfaces,
  SnapPageInstallButton as InstallButton,
  SnapPagePurchase as Purchase,
} from 'toolkit'

const defaultDesc = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

class SnapPage extends Component {

  onRequestSignin = () => {
    this.props.onRequestSignin(this.props.snap.id)
  }
  onRequestAuthorize = () => {
    this.props.onRequestAuthorize(this.props.snap.id)
  }
  onRequestConfirm = () => {
    this.props.onRequestConfirm(this.props.snap.id)
  }
  onRequestCancel = () => {
    this.props.onRequestCancel(this.props.snap.id)
  }

  render() {

    const {
      cardImgRootUrl,
      snap,
      onRequestInstall,
      onRequestRemove,
      onRequestSignin,
      onRequestAuthorize,
      onRequestConfirm,
      onRequestCancel,
    } = this.props

    if (!snap) return null

    const installProgress = (
      snap.status === 'installing'? snap.installProgress : 0
    )

    const icon = `${cardImgRootUrl}${snap.id}.png`

    return (
      <div className='SnapPage'>

        <ContentWrapper>
          <div className='SnapPage-header'>

            <div className='SnapPage-headerParts'>
              <div>
                <Summary
                  icon={icon}
                  name={snap.name}
                  author={snap.author}
                  rating={3}
                />
                <Tags
                  tags={['databases', 'cassandra', 'app-deployment']}
                />
              </div>
              <If cond={!snap.preinstalled}>
                <div className='SnapPage-installButton'>
                  <InstallButton
                    priceLabel={snap.price}
                    installProgress={installProgress}
                    status={snap.status}
                    snapId={snap.id}
                    snapName={snap.name}
                    onRequestInstall={onRequestInstall}
                    onRequestRemove={onRequestRemove}
                  />
                </div>
              </If>
            </div>

            {(() => {
              if (true || snap.status === 'installed' ||
                snap.status === 'uninstalled' ||
                snap.status === 'installing') {
                return null
              }
              return (
                <div className='SnapPage-purchase'>
                  <Purchase
                    status={snap.status}
                    onSignin={onRequestSignin}
                    onAuthorize={onRequestAuthorize}
                    onConfirm={onRequestConfirm}
                    onCancel={onRequestCancel}
                  />
                </div>
              )
            })()}

          </div>
        </ContentWrapper>

        <ContentWrapper background>
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
                  content={snap.description || defaultDesc}
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

        <If cond={!snap.preinstalled}>
          <ContentWrapper bordered>
            <ReviewList />
          </ContentWrapper>
        </If>
      </div>
    )
  }
}

export default SnapPage
