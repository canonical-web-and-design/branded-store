import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import './index.css'

// import Perf from 'react-addons-perf' // ES6

// (() => {
//   const div = document.createElement('div')
//   const btn = document.createElement('button')

//   btn.textContent = 'perf'
//   btn.style.background = '#666'
//   btn.style.border = '0'
//   btn.style.color = '#FFF'

//   div.style.padding = '20px'
//   div.style.position = 'absolute'
//   div.style.top = '0'
//   div.style.right = '0'
//   div.style.background = '#333'

//   div.appendChild(btn)
//   document.body.appendChild(div)

//   btn.onClick = () => {
//     console.log('TEST')
//   }
// })
// ()

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
