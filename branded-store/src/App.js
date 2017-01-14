import React, { Component } from 'react'
import './App.css'

import Header from 'toolkit/Header/Header'
import Footer from 'toolkit/Footer/Footer'
import ThemeChanger from './ThemeChanger/ThemeChanger'

import HomePage from './HomePage'
import StorePage from './StorePage'
import SnapPage from './SnapPage'

import createHistory from 'history/createBrowserHistory'
import createSnapApi from './snaps/snap-api'
import createBrands from './brands'

const publicUrl = process.env.PUBLIC_URL
const history = createHistory()
const sections = [ 'store', 'settings', 'snap' ]

const getBrands = createBrands(`${publicUrl}/brands`)

const snapApi = createSnapApi()

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
      brands: [],
      brand: -1,
      installing: [],
    }

    history.listen(this.handleNavigation.bind(this))
    snapApi.listen(this.handleSnapEvents.bind(this))

    this.onMenuItemClick = this.onMenuItemClick.bind(this)
    this.onOpenSnap = this.onOpenSnap.bind(this)
    this.reloadBrands = this.reloadBrands.bind(this)
    this.changeBrand = this.changeBrand.bind(this)
    this.requestInstall = this.requestInstall.bind(this)
  }

  componentDidMount() {
    // snapApi.requestInstalled()
    snapApi.installed().then(snaps => {
      this.setState({
        installedSnaps: snaps.map(snapToCard)
      })
    })
    snapApi.featured().then(snaps => {
      this.setState({
        featuredSnaps: snaps.map(snapToCard)
      })
    })
    this.reloadBrands()
  }

  componentDidUpdate() {
    const { location, snapPageSnap } = this.state

    const section = sectionFromPath(location.pathname)
    const snapId = snapIdFromPath(location.pathname)

    if (section === 'snap' && snapId && !(
      snapPageSnap && snapPageSnap.id === snapId
    )) {
      snapApi.snap(snapId).then(snap => {
        this.setState({
          snapPageSnap: snap
        })
      })
    }
  }

  handleNavigation(location) {
    this.setState({ location })
  }

  handleSnapEvents(event) {
    if (event.type === 'INSTALL_PROGRESS') {
      if (this.state.snapPageSnap) {
        snapApi.snap(this.state.snapPageSnap.id).then(snap => {
          this.setState({
            installing: event.installing,
            // installedSnaps: event.snaps.map(snapToCard),
            snapPageSnap: snap,
          })
        })
      } else {
        this.setState({
          installing: event.installing,
          // installedSnaps: event.snaps.map(snapToCard),
        })
      }
      return
    }
    if (event.type === 'INSTALLED_SNAPS') {
      this.setState({
        installedSnaps: event.snaps.map(snapToCard)
      })
      return
    }
  }

  reloadBrands() {
    this.setState({
      brands: [],
      brand: -1,
    }, () => {
      getBrands().then(brands => {
        this.setState({
          brands,
        })
      })
    })
  }

  requestInstall(snapId) {
    snapApi.install(snapId)
  }

  changeBrand(id) {
    this.setState({
      brand: id,
    })
  }

  onMenuItemClick(id) {
    history.push('/' + (id === 'home' ? '' : id))
  }

  onOpenSnap(id) {
    history.push(`/snap/${id}`)
  }

  render() {

    const {
      location,
      featuredSnaps,
      installedSnaps,
      snapPageSnap,
      brands,
      brand,
      installing,
    } = this.state

    const currentSection = sectionFromPath(location.pathname)
    const cardImgRootUrl = `${publicUrl}/icons/cards/`

    const brandData = brands[brand] || {
      deviceName: 'Connected grid router',
      deviceId: 'Cisco CGR1120 C02PQ53JFVH8',
    }

    const themeChanger = (
      <ThemeChanger
        brands={brands}
        onChangeBrand={this.changeBrand}
        reloadBrands={this.reloadBrands}
      />
    )

    return (
      <div className='App'>
        <style>{`
          .App a {
            color: ${brandData.color || '#333'}
          }
        `}</style>

        <Header
          menuitems={[
            { id: 'store', name: 'Store' },
            { id: 'settings', name: 'Settings' },
          ]}
          currentSection={currentSection}
          onMenuItemClick={this.onMenuItemClick}
          logo={
            brandData.folder
            ? `${publicUrl}/brands/${brandData.folder}/logo.png`
            : ''
          }
          customColor={brandData.color}
        />

        <main className='App-content'>
          {(() => {
            if (currentSection === 'home') return (
              <HomePage
                cardImgRootUrl={cardImgRootUrl}
                brandData={brandData}
                installedSnaps={installedSnaps}
                onOpenSnap={this.onOpenSnap}
              />
            )
            if (currentSection === 'store') return (
              <StorePage
                cardImgRootUrl={cardImgRootUrl}
                featuredSnaps={featuredSnaps}
                onOpenSnap={this.onOpenSnap}
              />
            )
            if (currentSection === 'snap') return (
              <SnapPage
                cardImgRootUrl={cardImgRootUrl}
                snap={snapPageSnap}
                installing={installing}
                installedSnaps={installedSnaps}
                onRequestInstall={this.requestInstall}
              />
            )
          })()}
        </main>

        <Footer firstLine={themeChanger} />
      </div>
    )
  }
}

export default App
