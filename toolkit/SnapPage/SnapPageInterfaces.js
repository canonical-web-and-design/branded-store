import React from 'react'
import './SnapPageInterfaces.css'

export default function SnapPageInterfaces(props) {
  return (
    <div className='SnapPageInterfaces'>
      <h2>Interfaces:</h2>
      <ul>
        {props.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
