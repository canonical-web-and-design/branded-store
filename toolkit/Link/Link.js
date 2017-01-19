import React from 'react'
import './Link.css'

import If from 'toolkit/If'
import Icon from 'toolkit/Icon/Icon'

import classes from 'toolkit/classes'

export default function Link({ color, label, external, onClick }) {
  const style = {}
  if (color) style.color = color
  return (
    <a
      role='button'
      onClick={onClick}
      className={classes({
        'Link': true,
        'Link-external': external,
      })}
      style={style}
    >
      {label}
      <If cond={external}>
        <span className='Link-external-icon'>
          <Icon name='external' />
        </span>
      </If>
    </a>
  )
}
