import React, { Component } from 'react'
import './App.css'
import './Loader.css'

import If from 'toolkit/If'

import Header from 'toolkit/Header/Header'
import Footer from 'toolkit/Footer/Footer'
import ThemeChanger from './ThemeChanger/ThemeChanger'

import HomePage from './HomePage'
import StorePage from './StorePage'
import SnapPageWrapper from './SnapPageWrapper'
import SettingsPage from './SettingsPage/SettingsPage'
import MyUbuntu from './MyUbuntu'

// import createHistory from 'history/createBrowserHistory'
import createHistory from 'history/createHashHistory'

import createStore from './store/store'
import createBrands from './brands'

// const DEFAULT_BRAND = 'ubuntu'
const DEFAULT_BRAND = 'keymile'

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
      brand: DEFAULT_BRAND,
      // waitingPayment: true,
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
      { brands: [], brand: DEFAULT_BRAND },
      () => {
        getBrands().then(brands => {
          this.setState({
            brands,
            brand: brands[0].id,
          })
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
  requestCancel = () => {
    this.state.store.cancelPurchases()
  }

  onMenuItemClick = (id) => {
    // if (id === 'home') {
      // if (this.state.waitingPayment) {
      //   this.stopWaitPayment()
      // } else {
      //   this.waitPayment()
      // }
      // return
    // }

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

  // waitPayment = () => {
  //   this.setState({
  //     waitingPayment: true,
  //   })
  // }
  // stopWaitPayment = () => {
  //   this.setState({
  //     waitingPayment: false,
  //   })
  // }

  render() {

    const {
      location,
      allSnaps,
      featuredSnapIds,
      brand,
      brands,
      // waitingPayment,
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

    const currSnap = allSnaps.find(snap => (
      snap.id === snapIdFromPath(location.pathname)
    ))

    let waitingPayment = false
    if (currentSection === 'snap' && currSnap) {
      waitingPayment = (
        currSnap.status === 'wait-confirm' ||
        currSnap.status === 'confirming'
      )
    }

    let waitStoreToPay = false
    let waitPayToStore = false
    if (currentSection === 'snap' && currSnap) {
      waitStoreToPay = (
        currSnap.status === 'authorizing'
      )
      waitPayToStore = (
        currSnap.status === 'confirming'
      )
    }

    return (
      <div className='App'>
        <style>{`a { color: ${brandData.color || '#333'} }`}</style>

        <If cond={!waitingPayment}>
          <div className='App-main'>
            <Header
              menuitems={[
                { id: 'store', name: 'Store' },
                { id: 'settings', name: 'Settings' },
              ]}
              currentSection={currentSection === 'snap'? 'store' : currentSection}
              onMenuItemClick={this.onMenuItemClick}
              logo={
                // brandData.id
                // ? `${pub}/brands/${brandData.id}/logo.png`
                // : ''
                `${pub}/brands/${brandData.id || DEFAULT_BRAND}/logo.png`
              }
              customColor={brandData.color}
            />
            <main className='App-content'>
              <If cond={currentSection === 'home'}>
                <HomePage
                  cardImgRootUrl={cardImgRootUrl}
                  brandData={brandData}
                  snaps={homeSnaps.map(snapToHomeCard)}
                  onOpenSnap={this.onOpenSnap}
                />
              </If>
              <If cond={currentSection === 'store'}>
                <StorePage
                  cardImgRootUrl={cardImgRootUrl}
                  featuredSnaps={featuredSnaps.map(snapToStoreCard)}
                  onOpenSnap={this.onOpenSnap}
                />
              </If>
              <If cond={currentSection === 'snap'}>
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
              </If>
              <If cond={currentSection === 'settings'}>
                <SettingsPage
                  screenId={currentSettingScreen}
                  onNavChange={this.settingsNavChange}
                />
              </If>
            </main>
            <Footer firstLine={themeChanger} />
          </div>
        </If>

        <If cond={waitingPayment}>
          <MyUbuntu
            onPurchase={this.requestConfirm}
            onCancel={this.requestCancel}
            snapId={currSnap && currSnap.id}
          />
        </If>

        <div className='Loader' style={{
          position: 'fixed',
          left: '0',
          right: '0',
          top: waitStoreToPay || waitPayToStore? 0 : '100%',
          bottom: '0',
          background: '#FFF',
          opacity: waitStoreToPay || waitPayToStore? 1 : 0,
          transition: 'opacity 150ms ease-in-out',
        }}>
          <p>
            <img
              src={`${pub}/spinner-2.png`}
              width={82/2}
              height={82/2}
              alt=''
            />
            <span>
              {
                !waitStoreToPay
                  ? 'Returning you to the store…'
                  : 'Talking to my.ubuntu.com…'
              }
            </span>
          </p>
        </div>
      </div>
    )
  }
}

export default App
