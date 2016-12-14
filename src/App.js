import React, { Component } from 'react'
import './App.css'

import Header from './Header'
import Footer from './Footer'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <main>
          <div className='App-content'>
          </div>
          <Footer />
        </main>
      </div>
    )
  }
}

export default App
