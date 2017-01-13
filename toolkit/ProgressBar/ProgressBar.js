import React from 'react'

export default function ProgressBar({ progress }) {
  return (
    <div style={{
      position: 'relative',
      height: '6px',
      minWidth: '10px',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        border: '1px solid #CDCDCD',
        borderRadius: '2px',
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: `${progress * 100}%`,
        background: '#335280',
        borderRadius: '2px',
      }} />
    </div>
  )
}
