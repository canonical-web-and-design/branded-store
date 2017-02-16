import React, { Component } from 'react'
import './SnapPage.css'
import formatDate from 'date-fns/format'
import { seedRandom } from '../utils'
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

// Get a last updated time based on the ID, between 1 and 10 days ago
function lastUpdatedFromId(idNum) {
  const lastUpdated = new Date()
  lastUpdated.setDate(lastUpdated.getDate() - 1 - Math.floor(idNum * 10))
  lastUpdated.setHours(0, 0, 0, 0)
  lastUpdated.setTime(lastUpdated.valueOf() + 1000 * 60 * 60 * 24 * idNum)
  return lastUpdated
}

// Return a number between 0 and 1 based on the ID
function numFromId(id) {
  const idHash = [...id].reduce((
    (total, char) => total + char.charCodeAt()
  ) , 0)
  return seedRandom(idHash)()
}

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
      snap,
      onRequestInstall,
      onRequestRemove,
      onRequestSignin,
      onRequestAuthorize,
      onRequestConfirm,
      onRequestCancel,
      onRequestStore,
    } = this.props

    if (!snap) return null

    const installProgress = (
      snap.status === 'installing'? snap.installProgress : 0
    )

    const idNum = numFromId(snap.id)
    const lastUpdated = formatDate(
      lastUpdatedFromId(idNum),
      'DD MMMM YYYY HH:mm:ss'
    )

    return (
      <div className='SnapPage'>

        <ContentWrapper>
          <div className='SnapPage-header'>

            <div className='SnapPage-headerParts'>
              <div>
                <Summary
                  icon={snap.iconUrl}
                  name={snap.name}
                  author={snap.author}
                  rating={3}
                />
                <Tags
                  tags={['databases', 'cassandra', 'app-deployment']}
                  onStoreClick={onRequestStore}
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

        <ContentWrapper background bordered>
          <div className='SnapPage-content'>

            <div>
              <Details
                items={[
                  ['Category', snap.category],
                  ['Size', snap.size],
                  ['Version', snap.version],
                  ['Channel', 'Stable'],
                  ['Updated', lastUpdated],
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
                items={snap.interfaces || [
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
