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
      topCards: cards(4),
      featuredCards: cards(8),
    }
  }

  render() {
    const { topCards, featuredCards } = this.state
    return (
      <div className='App'>
        <Header />
        <main>
          <div className='App-content'>
            <CardsList
              title='Top Rated'
              cards={topCards}
            />
            <CardsList
              title='Featured'
              cards={featuredCards}
            />
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}

export default App
