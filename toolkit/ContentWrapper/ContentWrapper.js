import React from 'react'
import './ContentWrapper.css'

export default function ContentWrapper(props) {
  const classNames = ['ContentWrapper']
  ;['background', 'bordered'].forEach(p => {
    if (props[p]) classNames.push(`ContentWrapper-${p}`)
  })
  return (
    <div className={classNames.join(' ')}>
      <div className='ContentWrapper-in'>
        {props.children}
      </div>
    </div>
  )
}
