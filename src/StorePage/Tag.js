import React, { PureComponent } from 'react'

import { Link } from 'toolkit'

export default class Tag extends PureComponent {
  handleClick = () => {
    this.props.onClick(this.props.name)
  }
  render() {
    const { name, color } = this.props
    return (
      <Link
        label={name}
        color={color}
        onClick={this.handleClick}
      />
    )
  }
}
