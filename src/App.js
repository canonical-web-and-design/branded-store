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
      searchTerms: '',
      searchResults: { groups: [], tags: [] },
      // waitForResults: -1, // timer
      cancelSearch: null,
      topCards: cards(4),
      featuredCards: cards(8),
    }

    this.onSearchChange = this.onSearchChange.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('DID UPDATE', this.state)
    const { searchTerms } = this.state

    if (!searchTerms || prevState.searchTerms === searchTerms) {
      return
    }

    search(searchTerms, cancel => {
      // console.log('cancel cb received')
      this.updateState({ cancelSearch: cancel })
    }).then(searchResults => {
      // console.log('results received', searchResults)
      this.updateState({ searchResults, cancelSearch: null })
    })
  }

  updateState(update) {
    // console.log('UPDATE', update)
    this.setState(Object.assign({}, this.state, update))
  }

  onSearchChange(value) {
    value = value.trim()

    if (this.state.cancelSearch) {
      console.log('CANCEL')
      this.state.cancelSearch()
    }

    this.updateState({
      searchTerms: value,
      cancelSearch: null,
    })

    // clearTimeout(this.state.waitForResults)

    // this.setState(Object.assign({}, this.state, {
    //   searchTerms: value,

    //   // simulate an async load of the results
    //   waitForResults: setTimeout(() => {
    //     this.setState(Object.assign({}, this.state, {
    //       searchResults: search(value),
    //       waitForResults: -1,
    //     }))
    //   }, value? 150 + Math.random() * 150 : 0)
    // }))
  }

  render() {
    const {
      topCards,
      featuredCards,
      searchTerms,
      searchResults,
      cancelSearch,
    } = this.state
    return (
      <div className='App'>
        <Header />

        <SearchField
          value={searchTerms}
          results={searchResults}
          onChange={this.onSearchChange}
          wait={!!cancelSearch}
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
