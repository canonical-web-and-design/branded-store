import React from 'react'
import './HistoryList.css'

export default function HistoryList(props) {
  return (
    <div className='HistoryList'>
      <h2>History</h2>
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

