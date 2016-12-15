import React, { Component } from 'react'
import './App.css'

import Header from './Header'
import Footer from './Footer'
import CardsList from './CardsList'
import SearchField from './SearchField'

import cards from './cards-data'
import search from './search'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentSearch: '',
      searchResults: search(''),
      waitForResults: -1, // timer
      topCards: cards(4),
      featuredCards: cards(8),
    }

    this.onSearchChange = this.onSearchChange.bind(this)
  }

  onSearchChange(value) {
    value = value.trim()

    clearTimeout(this.state.waitForResults)

    this.setState(Object.assign({}, this.state, {
      currentSearch: value,

      // simulate an async load of the results
      waitForResults: setTimeout(() => {
        this.setState(Object.assign({}, this.state, {
          searchResults: search(value),
          waitForResults: -1,
        }))
      }, value? 150 + Math.random() * 150 : 0)
    }))
  }

  render() {
    const {
      topCards,
      featuredCards,
      currentSearch,
      searchResults,
      waitForResults,
    } = this.state
    return (
      <div className='App'>
        <Header />

        <SearchField
          value={currentSearch}
          results={searchResults}
          onChange={this.onSearchChange}
          wait={waitForResults !== -1}
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
