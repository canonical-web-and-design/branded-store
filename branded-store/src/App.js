import React, { Component } from 'react'
import './App.css'

import Header from 'toolkit/Header/Header'
import Footer from 'toolkit/Footer/Footer'
import ThemeChanger from './ThemeChanger/ThemeChanger'

import HomePage from './HomePage'
import StorePage from './StorePage'
import SnapPageWrapper from './SnapPageWrapper'
import SettingsPage from './SettingsPage/SettingsPage'

import createHistory from 'history/createBrowserHistory'
import createStore from './store/store'
import createBrands from './brands'

const BRAND_DEFAULT = 'ubuntu'

const pub = process.env.PUBLIC_URL
const history = createHistory()
const sections = [ 'store', 'settings', 'snap' ]

const getBrands = createBrands(`${pub}/brands`)

function sectionFromPath(path) {
  const parts = path.split('/').slice(1)
  return parts[0] === ''? 'home' : (
    sections.find(section => parts[0] === section) || ''
  )
}

function settingScreenFromPath(path) {
  const parts = path.split('/').slice(1)
  return (parts[0] === 'settings' && parts[1]) || ''
}

function snapIdFromPath(path) {
  const parts = path.split('/').slice(1)
  return (parts[0] === 'snap' && parts[1]) || ''
}

function snapToStoreCard(snap) {
  return {
    id: snap.id,
    name: snap.name,
    author: snap.author,
    action: snap.price === 'free'? 'Install' : snap.price,
    image: snap.id,
    rating: snap.rating,
  }
}

function snapToHomeCard(snap) {
  return {
    id: snap.id,
    name: snap.name,
    author: snap.author,
    type: snap.type === 'Snap'? '' : snap.type,
    action: snap.status === 'installing'? 'Installing' : null,
    image: snap.id,
    installProgress: (
      snap.status === 'installing'
        ? snap.installProgress
        : -1
    ),
  }
}

class App extends Component {

  constructor(props) {
    super(props)

    const store = createStore()

    this.state = {
      location: history.location,
      store: store,
      allSnaps: [],
      featuredSnapIds: [],
      brands: [],
      brand: BRAND_DEFAULT,
    }

    history.listen(this.handleNavigation)
  }

  componentDidMount() {
    this.reloadBrands()
    this.state.store.listen(this.handleStoreEvents)
  }

  handleNavigation = (location) => {
    this.setState({ location })
    window.scrollTo(0, 0)
  }

  goto = (path) => {
    this.state.store.cancelPurchases()
    history.push('/' + (path || ''))
  }

  handleStoreEvents = (event) => {
    // console.log('[STORE EVENT]', event.type, event)
    if (event.type === 'ALL_SNAPS') {
      return this.setState({ allSnaps: event.snaps })
    }
    if (event.type === 'FEATURED_SNAPS') {
      return this.setState({ featuredSnapIds: event.ids })
    }
  }

  reloadBrands = () => {
    this.setState(
      { brands: [], brand: 'ubuntu' },
      () => {
        getBrands().then(brands => {
          this.setState({ brands })
        })
      }
    )
  }
  changeBrand = (id) => {
    this.setState({ brand: id })
    window.scrollTo(0, 0)
  }

  requestInstall = (snapId) => {
    this.state.store.install(snapId)
  }
  requestRemove = (snapId) => {
    this.state.store.remove(snapId)
  }
  requestSignin = (snapId) => {
    this.state.store.signin(snapId)
  }
  requestAuthorize = (snapId) => {
    this.state.store.authorize(snapId)
  }
  requestConfirm = (snapId) => {
    this.state.store.confirm(snapId)
  }
  requestCancel = (snapId) => {
    this.state.store.cancelPurchases()
  }

  onMenuItemClick = (id) => {
    this.goto(id === 'home'? '' : id)
  }
  onOpenSnap = (id) => {
    if (id === 'add') {
      return this.goto('store')
    }
    const snap = this.state.allSnaps.find(snap => snap.id === id)
    if (snap && !snap.preinstalled) {
      this.goto(`snap/${id}`)
    }
  }
  settingsNavChange = (id) => {
    this.goto(`settings${id? `/${id}` : ''}`)
  }

  snapIdsToSnaps = (ids) => (
    ids.map(id => (
      this.state.allSnaps.find(snap => snap.id === id)
    )).filter(snap => snap)
  )

  snapFromId = (id) => (
    this.state.allSnaps.find(snap => snap.id === id)
  )

  render() {

    const {
      location,
      allSnaps,
      featuredSnapIds,
      brand,
      brands,
    } = this.state

    const homeSnaps = allSnaps.filter(
      snap => (
        snap.status === 'installed' ||
        snap.status === 'installing'
      )
    )

    const featuredSnaps = this.snapIdsToSnaps(featuredSnapIds)

    const currentSection = sectionFromPath(location.pathname)

    const cardImgRootUrl = `${pub}/icons/cards/`

    const brandData = brands.find(br => br.id === brand) || {
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

    const currentSettingScreen = settingScreenFromPath(location.pathname)

    return (
      <div className='App'>
        <style>{`a { color: ${brandData.color || '#333'} }`}</style>

        <Header
          menuitems={[
            { id: 'store', name: 'Store' },
            { id: 'settings', name: 'Settings' },
          ]}
          currentSection={currentSection === 'snap'? 'store' : currentSection}
          onMenuItemClick={this.onMenuItemClick}
          logo={
            brandData.id
            ? `${pub}/brands/${brandData.id}/logo.png`
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
                snaps={homeSnaps.map(snapToHomeCard)}
                onOpenSnap={this.onOpenSnap}
              />
            )
            if (currentSection === 'store') return (
              <StorePage
                cardImgRootUrl={cardImgRootUrl}
                featuredSnaps={featuredSnaps.map(snapToStoreCard)}
                onOpenSnap={this.onOpenSnap}
              />
            )
            if (currentSection === 'snap') return (
              <SnapPageWrapper
                cardImgRootUrl={cardImgRootUrl}
                snap={allSnaps.find(snap => (
                  snap.id === snapIdFromPath(location.pathname)
                ))}
                onRequestInstall={this.requestInstall}
                onRequestRemove={this.requestRemove}
                onRequestSignin={this.requestSignin}
                onRequestAuthorize={this.requestAuthorize}
                onRequestConfirm={this.requestConfirm}
                onRequestCancel={this.requestCancel}
              />
            )
            if (currentSection === 'settings') return (
              <SettingsPage
                screenId={currentSettingScreen}
                onNavChange={this.settingsNavChange}
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
