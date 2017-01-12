import React, { Component } from 'react'
import './App.css'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import Header from 'toolkit/Header/Header'
import Footer from 'toolkit/Footer/Footer'
import CardsList from 'toolkit/CardsList/CardsList'
import SnapPage from './SnapPage/SnapPage'

import createHistory from 'history/createBrowserHistory'
import * as snaps from './snaps/snaps'
import cards from './cards-data'

const publicUrl = process.env.PUBLIC_URL
const history = createHistory()
const sections = [ 'store', 'settings', 'snap' ]

function sectionFromPath(path) {
  const parts = path.split('/').slice(1)
  return parts[0] === ''? 'home' : (
    sections.find(section => parts[0] === section) || ''
  )
}

function snapIdFromPath(path) {
  const parts = path.split('/').slice(1)
  return (parts[0] === 'snap' && parts[1]) || ''
}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      location: history.location,
      installedSnaps: [],
      topSnaps: cards(4),
      featuredSnaps: cards(8),
      snapPageSnap: undefined,
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

  componentDidUpdate() {
    const { location, snapPageSnap } = this.state
    const section = sectionFromPath(location.pathname)
    const snapId = snapIdFromPath(location.pathname)
    if (section === 'snap' && snapId && !(
      snapPageSnap && snapPageSnap.id === snapId
    )) {
      snaps.snap(snapId).then(snap => {
        this.setState({ snapPageSnap: snap })
      })
    }
  }

  handleNavigation(location) {
    this.setState({ location })
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
      snapPageSnap,
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
                <ContentWrapper>
                  <CardsList
                    title='Installed Snaps'
                    cards={installedSnaps}
                    cardImgUrl={cardImgUrl}
                    onCardClick={this.onCardClick}
                  />
                </ContentWrapper>
              )
              if (currentSection === 'store') return (
                <ContentWrapper>
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
                </ContentWrapper>
              )
              if (currentSection === 'snap') return (
                <SnapPage
                  snap={snapPageSnap}
                  icon={`${cardImgUrl}${snapPageSnap && snapPageSnap.id}.png`}
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
