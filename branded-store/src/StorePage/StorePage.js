import React, { Component } from 'react'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import Card from 'toolkit/Card/Card'
import CardsList from 'toolkit/CardsList/CardsList'

const publicUrl = process.env.PUBLIC_URL

class StoreCard extends Component {

  onClick = () => {
    this.props.onClick(this.props.card.id)
  }

  onActionClick = () => {
    this.props.onActionClick(this.props.card.snap)
  }

  render() {
    const {
      card,
      image,
      readyToBuy,
    } = this.props

    const {
      name,
      author,
      action,
      rating,
      id,
      type,
      installProgress = -1,
      snap,
    } = card

    let finalAction = (
      type? action : (action || 'open')
    )

    if ((readyToBuy && snap.status === 'uninstalled') || snap.status === 'authorizing') {
      finalAction = 'Buy'
    }

    return (
      <Card
        name={name}
        author={author}
        action={finalAction}
        type={type}
        image={image}
        onClick={this.onClick}
        onActionClick={this.onActionClick}
        rating={rating}
        positive={id === 'add'}
        alignBottom={id === 'add'}
        installProgress={installProgress}
      />
    )
  }
}

class StorePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      readyToBuy: '',
    }
  }

  onActionClick = (snap) => {
    if (snap.status === 'installed') {
      this.props.onRemoveSnap(snap.id)
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

  render() {
    const {
      featuredSnaps,
      cardImgRootUrl,
      onOpenSnap,
    } = this.props

    const header = (
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
            Featured Snaps
          </h1>
          <p style={{ fontSize: '16px' }}>
            {[
              'databases',
              'network',
              'robotics',
              'home',
              'private',
            ].map(tag => (
              <span key={tag}>
                <a role='button'>{tag}</a>
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
            cards={featuredSnaps}
            cardImgRootUrl={cardImgRootUrl}
            header={header}
          >
            {featuredSnaps.map((card, i) => (
              <StoreCard
                key={card.id + i}
                card={card}
                action={card.installed? 'Remove' : ''}
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
