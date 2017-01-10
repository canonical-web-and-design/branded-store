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

    this.onMenuItemClick = this.onMenuItemClick.bind(this)
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }

  onMenuItemClick(id) {
    console.log(id)
  }

  render() {

    const {
      topCards,
      featuredCards,
    } = this.state

    return (
      <div className='App'>
        <Header
          menuitems={[
            { id: 'store', name: 'Store' },
            { id: 'settings', name: 'Settings' },
          ]}
          onMenuItemClick={this.onMenuItemClick}
        />

        <main className='App-content'>

          <CardsList
            title='Top Rated'
            cards={topCards}
          />

          <CardsList
            title='Featured'
            cards={featuredCards}
          />

        </main>
        <Footer />
      </div>
    )
  }
}

export default App
