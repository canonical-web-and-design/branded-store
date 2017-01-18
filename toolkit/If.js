import React from 'react'

export default function If({ cond, children }) {
  if (!cond) return null
  return (
    Array.isArray(children)
      ? ( <div>{children}</div> )
      : children
  )
}
