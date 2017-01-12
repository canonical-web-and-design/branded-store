import React, { Component } from 'react'
import './App.css'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import Header from 'toolkit/Header/Header'
import Footer from 'toolkit/Footer/Footer'
import CardsList from 'toolkit/CardsList/CardsList'
import SnapPage from 'toolkit/SnapPage/SnapPage'

import createHistory from 'history/createBrowserHistory'
import * as snapApi from './snaps/snap-api'

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

function snapToCard(snap) {
  return {
    id: snap.id,
    name: snap.name,
    author: snap.author,
    action: snap.price === 'free'? 'Install' : snap.price,
    image: snap.id,
  }
}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      location: history.location,
      installedSnaps: [],
      featuredSnaps: [],
      snapPageSnap: undefined,
    }

    history.listen(this.handleNavigation.bind(this))

    this.onMenuItemClick = this.onMenuItemClick.bind(this)
    this.onCardClick = this.onCardClick.bind(this)
  }

  componentDidMount() {
    snapApi.installed().then(installedSnaps => {
      this.setState({
        installedSnaps: installedSnaps.map(snapToCard)
      })
    })
    snapApi.featured().then(featuredSnaps => {
      this.setState({
        featuredSnaps: featuredSnaps.map(snapToCard)
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
      snapApi.snap(snapId).then(snap => {
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
                    title='Featured Snaps'
                    cards={featuredSnaps}
                    cardImgUrl={cardImgUrl}
                    onCardClick={this.onCardClick}
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
