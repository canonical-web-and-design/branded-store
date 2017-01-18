import React from 'react'
import './Button.css'

import classes from 'toolkit/classes'

export default function Button({
  disabled,
  type,
  onClick,
  label,
  loading,
  variableWidth,
}) {
  return (
    <button
      disabled={disabled}
      type='button'
      className={classes({
        'Button': true,
        'Button-positive': type === 'positive',
        'Button-strong': type === 'strong',
        'Button-variable': variableWidth,
      })}
      onClick={onClick}
    >
      <span>
        {loading
          ? <span className='Button-spinner' />
          : null
        }
        <span>{label}</span>
      </span>
    </button>
  )
}
