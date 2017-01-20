import React from 'react'
import './HistoryList.css'

export default function HistoryList(props) {
  return (
    <div className='HistoryList'>
      <h2>History</h2>
      {(() => props.history.map((entry,i) => (
        <div key={i}>
          {entry}
        </div>
      )))()}
    </div>
  )
}
