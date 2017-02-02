import React, { PureComponent } from 'react'

import { Card } from 'toolkit'

export default class StoreCard extends PureComponent {

  onClick = () => {
    this.props.onClick(this.props.card.id)
  }

  onActionClick = () => {
    this.props.onActionClick(this.props.card.snap)
  }

  render() {
    const { card, image, readyToBuy } = this.props

    const {
      name,
      author,
      action,
      rating,
      id,
      type,
      snap,
      installProgress = -1,
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
