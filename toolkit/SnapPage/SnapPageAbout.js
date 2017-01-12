import React from 'react'
import './SnapPageAbout.css'

export default function SnapPageAbout(props) {
  return (
    <div className='SnapPageAbout'>
      <h2 className='SnapPageAbout-title'>About</h2>
      <p>{props.content}</p>
    </div>
  )
}
