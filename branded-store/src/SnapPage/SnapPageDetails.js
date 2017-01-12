import React from 'react'
import './SnapPageDetails.css'

export default function SnapPageDetails(props) {
  return (
    <div className='SnapPageDetails'>
      <ul>
        {props.items.map((item, i) => (
          <li key={i}>
            <div>{item[0]}</div>
            <div>{item[1]}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
