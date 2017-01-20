import React from 'react'
import './Loader.css'
import spinner from './spinner.png';

export default function Loader({ visible, label }) {
  return (
    <div className='Loader' style={{
      position: 'fixed',
      left: '0',
      right: '0',
      top: visible? 0 : '100%',
      bottom: '0',
      background: '#FFF',
      opacity: visible? 1 : 0,
      transition: 'opacity 150ms ease-in-out',
    }}>
    <p>
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
  </div>
  )
}
