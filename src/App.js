import React, { Component } from 'react'
import './App.css'

import Header from './Header'
import Footer from './Footer'
import CardsList from './CardsList'

import cards from './cards-data'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cards: cards(43),
    }
  }

  render() {
    const { cards } = this.state
    return (
      <div className='App'>
        <Header />
        <main>
          <div className='App-content'>
            <CardsList cards={cards} />
          </div>
          <Footer />
        </main>
      </div>
    )
  }
}

export default App
