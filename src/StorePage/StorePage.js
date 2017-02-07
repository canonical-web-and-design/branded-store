import React, { PureComponent } from 'react'

import {
  ContentWrapper,
  CardsList,
} from 'toolkit'

import Tag from './Tag'
import StoreCard from './StoreCard'
import Highlight from '../Highlight/Highlight'

function snapToStoreCard(snap) {
  return {
    id: snap.id,
    name: snap.name,
    author: snap.author,
    action: snap.status === 'installing'? 'Installing' : (
      snap.status === 'installed'? 'open' : (
        snap.price === 'free'? 'Install' : snap.price
      )
    ),
    image: snap.id,
    rating: snap.rating,
    installProgress: (
      snap.status === 'installing'
        ? snap.installProgress
        : -1
    ),
    snap: snap,
  }
}

function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

const publicUrl = process.env.PUBLIC_URL

class StorePage extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      readyToBuy: '',
    }
  }

  onActionClick = (snap) => {
    if (snap.status === 'installed') {
      // this.props.onOpenSnap(snap.id)
      // this.props.onRemoveSnap(snap.id)
      return
    }

    if (snap.status !== 'uninstalled') return

    if (snap.price === 'free') {
      this.props.onInstallSnap(snap.id)
      return
    }

    if (this.state.readyToBuy !== snap.id) {
      this.setState({ readyToBuy: snap.id })
      return
    }

    this.props.onInstallSnap(snap.id)
    this.setState({ readyToBuy: '' })
  }

  handleTagClick = (tag) => {
    this.props.onTagClick(tag)
  }

  render() {

    const {
      brandData,
      cardImgRootUrl,
      onOpenSnap,
      categories,
      featuredSnaps,
      category = '',
    } = this.props

    const featuredSnapCards = featuredSnaps.map(snapToStoreCard)

    const header = (
      <div>
        <div>
          <div
            style={{
              display: 'flex',
              marginTop: '25px',
              marginBottom: '20px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h1 style={{ fontSize: '24px' }}>
              {category? capitalize(category) : 'Featured'}
            </h1>
            <p style={{ fontSize: '16px' }}>
              {categories.map(tag => (
                <span key={tag}>
                  <Tag
                    name={tag}
                    onClick={this.handleTagClick}
                    color={brandData.color2}
                  />
                  <span>{' '}</span>
                </span>
              ))}
            </p>
          </div>
          <div
            style={{
              width: '100%',
              height: '0',
              marginTop: '20px',
              borderBottom: '1px dotted #D2D2D2',
            }} 
          />
        </div>
        {category? (
          <div style={{
            margin: '38px 0',
          }}>
            <Highlight />
          </div>
        ) : null}
      </div>
    )

    return (
      <ContentWrapper>
        <div className='App-store'>
          <img
            style={{
              width: '100%',
              marginTop: '20px',
              marginBottom: '40px',
            }}
            width={1968/2}
            height={84/2}
            src={`${publicUrl}/search-field.png`}
            alt='Search Field placeholder'
          />
          <CardsList
            cards={featuredSnapCards}
            cardImgRootUrl={cardImgRootUrl}
            header={header}
          >
            {featuredSnapCards.map((card, i) => (
              <StoreCard
                key={card.id + i}
                card={card}
                action={card.installed? 'open' : ''}
                image={`${cardImgRootUrl}${card.image}.png`}
                onClick={onOpenSnap}
                onActionClick={this.onActionClick}
                installProgress={card.installProgress}
                readyToBuy={this.state.readyToBuy === card.snap.id}
              />
            ))}
          </CardsList>
        </div>
      </ContentWrapper>
    )
  }
}

export default StorePage
