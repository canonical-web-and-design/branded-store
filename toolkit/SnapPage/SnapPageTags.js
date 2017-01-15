import React from 'react'

export default function SnapPageTags(props) {
  return (
    <div className='SnapPageTags'>
      <p>
        {props.tags.map((tagname, i) => (
          <span key={i}>
            {i? <span>{', '}</span> : null}
            <a role='button'>{tagname}</a>
          </span>
        ))}
      </p>
    </div>
  )
}
