import React from 'react'
import './Loader.css'
import { classes } from 'toolkit'
import spinner from './spinner.png'

export default function Loader({ visible, label, label2 }) {
  return (
    <div className={classes({
      'Loader': true,
      'Loader-visible': visible,
    })}
    >
    <p className='Loader-label'>
      <img
        src={spinner}
        width={82/2}
        height={82/2}
        alt=''
      />
      <span>
        {label}
      </span>
    </p>
    {label2 && (
      <p className='Loader-label2'>
        {label2}
      </p>
    )}
  </div>
  )
}
