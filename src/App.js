import React, { Component } from 'react'
import './App.css'

import Header from './Header'
import Footer from './Footer'
import CardsList from './CardsList'
import SearchField from './SearchField'

import cards from './cards-data'
import search from './search'

const SLOW_SEARCH_TIMEOUT = 500

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      searchTerms: '',
      searchResults: { groups: [], tags: [] },
      cancelSearch: null,
      slowSearchRequest: false,
      slowSearchRequestTimer: -1,
      topCards: cards(4),
      featuredCards: cards(8),
    }

    this.onSearchChange = this.onSearchChange.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerms } = this.state
    if (prevState.searchTerms !== searchTerms) {
      this.initSearch(searchTerms)
    }
  }

  initSearch(searchTerms) {
    let cancel = null

    clearTimeout(this.state.slowSearchRequestTimer)

    if (!searchTerms) {
      this.updateState({
        slowSearchRequest: false,
        slowSearchRequestTimer: -1,
        searchResults: { groups: [], tags: [] },
        cancelSearch: null,
      })
      return
    }

    // start the search request
    search(searchTerms, c => cancel = c)

      .then(results => {
        clearTimeout(this.state.slowSearchRequestTimer)
        this.updateState({
          slowSearchRequest: false,
          slowSearchRequestTimer: -1,
          searchResults: results,
          cancelSearch: null,
        })
      })

      .catch(() => {
        clearTimeout(this.state.slowSearchRequestTimer)
        this.updateState({
          slowSearchRequest: false,
          slowSearchRequestTimer: -1,
          cancelSearch: null,
        })
      })

    // start the slow search timer
    const slowSearchRequestTimer = setTimeout(() => {
      this.updateState({
        slowSearchRequest: true,
        slowSearchRequestTimer: -1,
      })
    }, SLOW_SEARCH_TIMEOUT)

    this.updateState({
      cancelSearch: () => {
        clearTimeout(this.state.slowSearchRequestTimer)
        cancel()
      },
      slowSearchRequestTimer,
    })
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }

  onSearchChange(value) {
    const { cancelSearch } = this.state
    value = value.trim()

    if (cancelSearch) {
      cancelSearch()
    }

    this.updateState({
      searchTerms: value,
      cancelSearch: null,
    })
  }

  render() {
    const {
      topCards,
      featuredCards,
      searchTerms,
      searchResults,
      slowSearchRequest,
    } = this.state
    return (
      <div className='App'>
        <Header />

        <SearchField
          value={searchTerms}
          results={searchResults}
          onChange={this.onSearchChange}
          wait={slowSearchRequest}
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
