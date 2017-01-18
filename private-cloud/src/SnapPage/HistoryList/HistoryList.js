import React from 'react'
import './HistoryList.css'

export default function HistoryList(props) {
  return (
    <div className='HistoryList'>
      <h2>History</h2>
      {(() => Array(3).fill(1).map((k,i) => (
        <div key={i}>
          {'Last run today'}
        </div>
      )))()}
    </div>
  )
}
