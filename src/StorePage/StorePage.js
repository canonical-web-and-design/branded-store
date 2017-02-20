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
    iconUrl: snap.iconUrl,
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
      onOpenSnap,
      categories,
      featuredSnaps,
      category = '',
    } = this.props

    const featuredSnapCards = featuredSnaps.map(snapToStoreCard)

    const header = (
      <div>
        <div
          style={{ 
            fontSize: '24px',
            margin: '45px 0 55px 0',
            }}
        >
          <h1 style={{ fontSize: '24px' }}>
            {category? capitalize(category) : 'App store'}
          </h1>
          <p 
            style={{ 
              fontSize: '16px',
              marginTop: '23px',
              }}
            >
            {categories.map((tag,i) => (
              <span key={tag}
                style={{
                  marginRight: '20px',
                  paddingBottom: '10px',
                  borderWidth: '2px',
                  borderBottomStyle:  i === 0? 'solid' : 'none',
                  borderBottomColor: brandData.color
                }}
              >
                <Tag
                  name={tag}
                  onClick={this.handleTagClick}
                  color={brandData.color}
                />
              </span>
            ))}
          </p>
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 50px)'
        }}
      >
        <ContentWrapper>
          <img
            style={{
              width: '100%',
              marginTop: '30px'
            }}
            width={1968/2}
            height={84/2}
            src={`${publicUrl}/search-field.png`}
            alt='Search Field placeholder'
          />
          {header}
        </ContentWrapper>
        <ContentWrapper
          background
          bordered
          style={{
          flexGrow: '1',
        }}
        >
          <CardsList
            cards={featuredSnapCards}
            
          >
            {featuredSnapCards.map((card, i) => (
              <StoreCard
                key={card.id + i}
                card={card}
                action={card.installed? 'open' : ''}
                image={card.iconUrl}
                onClick={onOpenSnap}
                onActionClick={this.onActionClick}
                installProgress={card.installProgress}
                readyToBuy={this.state.readyToBuy === card.snap.id}
              />
            ))}
          </CardsList>
        </ContentWrapper>
      </div>
    )
  }
}

export default StorePage
