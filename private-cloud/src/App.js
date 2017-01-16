import React, { Component } from 'react'
import './App.css'

import Header from 'toolkit/Header/Header'
import Footer from 'toolkit/Footer/Footer'
import CardsList from 'toolkit/CardsList/CardsList'

import cards from './cards-data'

import createHistory from 'history/createBrowserHistory'

const publicUrl = process.env.PUBLIC_URL
//@todo: change the snapweb url to something not local
const snapwebUrl = 'http://localhost:3001/'
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
      installedServices: cards(6),
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
    if (id === 'store') {
      const win = window.open(snapwebUrl, '_blank');
      if (win) {
        //Browser has allowed it to be opened
        win.focus();
      }
    }
    //history.push('/' + (id === 'home' ? '' : id))
  }

  render() {

    const {
      location,
      installedServices,
    } = this.state

    const currentSection = sectionFromPath(location.pathname)

    const cardImgRootUrl = `${publicUrl}/icons/cards/`

    return (
      <div className='App'>

        <Header
          menuitems={[
            { id: 'store', name: 'Store' },
          ]}
          currentSection={currentSection}
          onMenuItemClick={this.onMenuItemClick}
        />

        <main className='App-content'>

          {(() => {
            if (currentSection === 'home') return (
              <CardsList
                title='All Services'
                cards={installedServices}
                cardImgRootUrl={cardImgRootUrl}
              />
            )
          })()}

        </main>

        <Footer />
      </div>
    )
  }
}

export default App
