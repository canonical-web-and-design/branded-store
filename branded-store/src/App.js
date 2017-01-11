import React, { Component } from 'react'
import './App.css'

import Header from 'toolkit/Header/Header'
import Footer from 'toolkit/Footer/Footer'
import CardsList from 'toolkit/CardsList/CardsList'

import * as snaps from './snaps/snaps'

import cards from './cards-data'

import createHistory from 'history/createBrowserHistory'

const publicUrl = process.env.PUBLIC_URL
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
      location: history.location,
      installedSnaps: [],
      topSnaps: cards(4),
      featuredSnaps: cards(8),
    }

    history.listen(this.handleNavigation.bind(this))

    this.onMenuItemClick = this.onMenuItemClick.bind(this)
    this.onCardClick = this.onCardClick.bind(this)
  }

  componentDidMount() {
    snaps.installed().then(installedSnaps => {
      this.setState({
        installedSnaps: installedSnaps.map(snap => ({
          id: snap.id,
          name: snap.name,
          author: snap.author,
          action: snap.price === 'free'? 'Install' : snap.price,
          image: snap.id,
        }))
      })
    })
  }

  handleNavigation(location) {
    this.setState({ location: location })
  }

  onMenuItemClick(id) {
    history.push('/' + (id === 'home' ? '' : id))
  }

  onCardClick(id) {
    history.push(`/snap/${id}`)
  }

  render() {

    const {
      location,
      topSnaps,
      featuredSnaps,
      installedSnaps,
    } = this.state

    const currentSection = sectionFromPath(location.pathname)

    const cardImgUrl = `${publicUrl}/icons/cards/`

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
                cardImgUrl={cardImgUrl}
                onCardClick={this.onCardClick}
              />
            )
            if (currentSection === 'store') return (
              <div>
                <CardsList
                  title='Top'
                  cards={topSnaps}
                  cardImgUrl={cardImgUrl}
                />
                <CardsList
                  title='Featured'
                  cards={featuredSnaps}
                  cardImgUrl={cardImgUrl}
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
