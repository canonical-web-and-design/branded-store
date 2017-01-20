import React, { Component } from 'react'
import './SnapPage.css'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import ReviewList from 'toolkit/ReviewList/ReviewList'

import Summary from 'toolkit/SnapPage/SnapPageSummary'
import Tags from 'toolkit/SnapPage/SnapPageTags'
import Details from 'toolkit/SnapPage/SnapPageDetails'
import About from 'toolkit/SnapPage/SnapPageAbout'
import Interfaces from 'toolkit/SnapPage/SnapPageInterfaces'
import InstallButton from 'toolkit/SnapPage/SnapPageInstallButton'
import Purchase from 'toolkit/SnapPage/SnapPagePurchase'

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

        <ContentWrapper background>
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
          <ReviewList />
        </ContentWrapper>
      </div>
    )
  }
}

export default SnapPage
