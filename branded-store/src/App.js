import React, { Component } from 'react'
import './App.css'

import Header from './Header'
import Footer from './Footer'
import CardsList from './CardsList'

import cards from './cards-data'

import createHistory from 'history/createBrowserHistory'

const history = createHistory()

const sections = [ 'store', 'settings' ]

function sectionFromPath(path) {
  return path === '/' ? 'home' : (
    sections.find(section => (
      path.startsWith(`/${section}`)
    )) || ''
  )
}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      installedSnaps: cards(4),
      topSnaps: cards(4),
      featuredSnaps: cards(8),
      location: history.location,
    }

    history.listen(this.handleNavigation.bind(this))

    this.onMenuItemClick = this.onMenuItemClick.bind(this)
  }

  handleNavigation(location) {
    this.updateState({ location: location })
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }

  onMenuItemClick(id) {
    history.push('/' + (id === 'home' ? '' : id))
  }

  render() {

    const {
      location,
      topSnaps,
      featuredSnaps,
      installedSnaps,
    } = this.state
    const currentSection = sectionFromPath(location.pathname)

    return (
      <div className='App'>

        <Header
          menuitems={[
            { id: 'store', name: 'Store' },
            { id: 'settings', name: 'Settings' },
          ]}
          currentSection={currentSection}
          onMenuItemClick={this.onMenuItemClick}
        />

        <main className='App-content'>

          {(() => {
            if (currentSection === 'home') return (
              <CardsList
                title='Installed Snaps'
                cards={installedSnaps}
              />
            )
            if (currentSection === 'store') return (
              <div>
                <CardsList
                  title='Top'
                  cards={topSnaps}
                />
                <CardsList
                  title='Featured'
                  cards={featuredSnaps}
                />
              </div>
            )
          })()}

        </main>

        <Footer />
      </div>
    )
  }
}

export default App
