import React from 'react'
import './Button.css'

import classes from 'toolkit/classes'

export default function Button(props) {
  return (
    <button
      type='button'
      className={classes({
        'Button': true,
        'Button-positive': props.positive,
      })}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  )
}
