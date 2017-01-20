import React from 'react'

const icons = {
  external: (
    <g>
      <path d='M9.945 5.84L6.47 9.317 4.685 7.53 8.16 4.054C7.165 3.012 6.387 2.1 6.43 1.924c.112-.452 7.187-2.22 7.525-1.88.34.337-1.43 7.412-1.882 7.525-.176.043-1.088-.735-2.13-1.73zM4.85 1.068v1.618c-3.2.018-3.234.202-3.234 2.153v5.39c0 2.156 0 2.156 4.31 2.156h1.078c4.31 0 4.31 0 4.31-2.156v-1.08h1.617v1.618C12.93 14 12.39 14 7.543 14H5.388C.538 14 0 14 0 10.766V4.298c0-3.1.538-3.224 4.85-3.23z' />
    </g>
  ),
}

export default function Icon({ name, color, size }) {
  return icons[name]? (
    <svg viewBox='0 0 14 14' style={{
      fill: color || 'currentColor',
      verticalAlign: 'middle',
      width: size || '14px',
      height: size || '14px',
    }}>
      {icons[name]}
    </svg>
  ) : null
}
