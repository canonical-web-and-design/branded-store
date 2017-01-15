import React from 'react'
import './Button.css'

const classes = (names) => (
  Object.entries(names)
    .filter(i => i[1])
    .map(i => i[0])
    .join(' ')
)

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
