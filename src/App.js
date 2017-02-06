import React, { Component } from 'react'
import './App.css'

import 'toolkit/lib/bundle.css'

import {
  If,
  Header,
  Footer,
} from 'toolkit'

import ThemeChanger from './ThemeChanger/ThemeChanger'
import Loader from './Loader/Loader'

import HomePage from './HomePage/HomePage'
import StorePage from './StorePage/StorePage'
import SnapPage from './SnapPage/SnapPage'
import SettingsPage from './SettingsPage/SettingsPage'
import MyUbuntu from './MyUbuntu/MyUbuntu'

import createHistory from 'history/createHashHistory'
import miniroutes from 'miniroutes'

import createStore from './store/store'
import createBrands from './brands'
import createApi from './api'

const DEFAULT_BRAND = 'lime'
const DEFAULT_API_BASE_URL = 'http://192.168.50.220:4200/api/v2'

const pub = process.env.PUBLIC_URL

const ROUTES = [
  ['store', /^store$/],
  ['store-category', /^store\/category\/(.+)?/],
  ['settings', /^settings(?:\/(.+))?$/],
  ['snap', /^snap\/(.+)$/],
  ['snap-store', /^store\/snap\/(.+)$/],
  ['snap-category', /^store\/category\/([^\/]+)\/snap\/(.+)$/],
  ['home', /.*/],
]

// section based on route name
const sections = {
  'store': ['store', 'store-category'],
  'settings': ['settings'],
  'snap': ['snap', 'snap-store', 'snap-category'],
  'home': ['home'],
}

const categories = [
  'databases',
  'network',
  'robotics',
  'home',
  'private',
]

const getBrands = createBrands(`${pub}/brands`)

class App extends Component {

  constructor(props) {
    super(props)

    const store = createStore()
    const api = createApi(DEFAULT_API_BASE_URL)

    this.state = {
      route: { name: '', params: [], value: '' },
      store: store,
      api: api,
      allSnaps: [],
      featuredSnapIds: [],
      brands: [],
      brand: DEFAULT_BRAND,
      // waitingPayment: true,
      quickBuySnap: '',
    }

    this.routing = miniroutes(ROUTES, this.handleRouteUpdate)
    this.history = createHistory()
    this.history.listen((location) => {
      this.routing(location.pathname.slice(1))
    })
    api.listen(this.handleApiMessage)
  }

  componentDidMount() {
    this.state.store.listen(this.handleStoreEvents)
    this.reloadBrands()
    this.routing(this.history.location.pathname.slice(1))
  }

  handleApiMessage = (message) => {
    console.log(message)
  }

  handleRouteUpdate = (route, previous) => {
    this.setState({ route })
    window.scrollTo(0, 0)
  }

  goto = (path) => {
    const pathname = `/${!path || path === 'home'? '' : path}`
    if (path !== this.state.route.path) {
      this.state.store.cancelPurchases()
      this.history.push(pathname)
    }
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

  getSnap = (id) => (
    this.state.allSnaps.find(snap => snap.id === id)
  )

  requestInstall = (snapId) => {
    const { store, api } = this.state
    store.install(snapId)
    api.request('enable', { name: snapId })
  }
  requestRemove = (snapId) => {
    const { store, api } = this.state
    store.remove(snapId)
    api.request('disable', { name: snapId })
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

  quickRemove = (snapId) => {
    const snap = this.getSnap(snapId)
    if (!snap) return
    this.state.store.remove(snapId)
  }

  quickInstall = (snapId) => {
    const snap = this.getSnap(snapId)
    if (!snap) return

    this.requestInstall(snapId)
    if (snap.price !== 'free' ) {
      this.setState({ quickBuySnap: snapId })
    }
  }

  handleMenuItemClick = (id) => {
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

  handleLogoClick = () => {
    window.open('http://www.limemicro.com/')
  }

  handleOpenSnap = (id) => {
    if (id === 'add') {
      return this.goto('store')
    }
    const snap = this.getSnap(id)
    // if (snap && !snap.preinstalled) {
    if (snap) {
      this.goto(`snap/${id}`)
    }
  }

  handleOpenSettings = () => {
    this.goto('settings')
  }

  handleSettingsNavChange = (id) => {
    this.goto(`settings${id? `/${id}` : ''}`)
  }

  snapIdsToSnaps = (ids) => (
    ids.map(this.getSnap).filter(snap => snap)
  )

  getFeaturedSnaps = () => {
    return this.snapIdsToSnaps(this.state.featuredSnapIds)
  }

  handleTagClick = (name) => {
    this.goto(`store/category/${name}`)
  }

  render() {

    const {
      allSnaps,
      brand,
      brands,
      route,
    } = this.state

    const homeSnaps = allSnaps.filter(
      snap => (
        snap.status === 'installed'
        // || snap.status === 'installing'
      )
    )

    const section = Object.keys(sections).find(
      name => sections[name].includes(route.name)
    )

    const cardImgRootUrl = `${pub}/icons/cards/`

    const brandData = brands.find(br => br.id === brand) || {}

    const themeChanger = brands.length < 2? null : (
      <ThemeChanger
        brands={brands}
        onChangeBrand={this.changeBrand}
        reloadBrands={this.reloadBrands}
      />
    )

    const currSnap = allSnaps.find(snap => (
      snap.id === route.params[route.params.length - 1] ||
      snap.id === this.state.quickBuySnap
    ))

    let waitingPayment = false
    if ((section === 'store' || section === 'snap') && currSnap) {
      waitingPayment = (
        currSnap.status === 'wait-confirm' ||
        currSnap.status === 'confirming1' ||
        currSnap.status === 'confirming2'
      )
    }

    let waitStoreToPay = false
    let waitPayToStore = false
    if ((section === 'store' || section === 'snap') && currSnap) {
      waitStoreToPay = (
        currSnap.status === 'authorizing'
      )
      waitPayToStore = (
        currSnap.status === 'confirming1' ||
        currSnap.status === 'confirming2'
      )
    }

    return (
      <div className='App'>
        <style>{`
          a, .SnapPageTags { color: ${brandData.color2 || '#333'} }
          .external, .external-branded {
            background-image: url(${pub}/external-${brandData.id}.svg);
          }
          .App-payment .external, .App-payment .external-branded {
            background-image: url(${pub}/external.svg);
          }
        `}</style>

        <If cond={!waitingPayment}>
          <div className='App-main'>
            <Header
              menuitems={[
                { id: 'home', name: brandData.systemName },
              ]}
              currentSection={section}
              onMenuItemClick={this.handleMenuItemClick}
              onLogoClick={this.handleLogoClick}
              logo={
                // brandData.id
                // ? `${pub}/brands/${brandData.id}/logo.png`
                // : ''
                `${pub}/brands/${brandData.id || DEFAULT_BRAND}/logo.png`
              }
              customColor={brandData.color}
            />
            <main className='App-content'>
              <If cond={section === 'home'}>
                <HomePage
                  cardImgRootUrl={cardImgRootUrl}
                  snaps={homeSnaps}
                  onOpenSnap={this.handleOpenSnap}
                  onOpenSettings={this.handleOpenSettings}
                  brandData={brandData}
                />
              </If>
              <If cond={section === 'store'}>
                <StorePage
                  cardImgRootUrl={cardImgRootUrl}
                  featuredSnaps={this.getFeaturedSnaps()}
                  onOpenSnap={this.handleOpenSnap}
                  onTagClick={this.handleTagClick}
                  onInstallSnap={this.quickInstall}
                  onRemoveSnap={this.quickRemove}
                  categories={categories}
                  category={route.name === 'store-category'? route.params[0] : ''}
                  brandData={brandData}
                />
              </If>
              <If cond={section === 'snap'}>
                <div className='App-SnapPage'>
                  <SnapPage
                    cardImgRootUrl={cardImgRootUrl}
                    snap={allSnaps.find(snap => (
                      snap.id === route.params[route.params.length - 1]
                    ))}
                    onRequestInstall={this.requestInstall}
                    onRequestRemove={this.requestRemove}
                    onRequestSignin={this.requestSignin}
                    onRequestAuthorize={this.requestAuthorize}
                    onRequestConfirm={this.requestConfirm}
                    onRequestCancel={this.requestCancel}
                  />
                </div>
              </If>
              <If cond={section === 'settings'}>
                <SettingsPage
                  screenId={route.params[0]}
                  onNavChange={this.handleSettingsNavChange}
                />
              </If>
            </main>
            <Footer 
              firstLine={themeChanger}
              copyright={`© ${(new Date()).getFullYear()} ${brandData.brandName}`}
              logo={`${pub}/brands/${brandData.id || DEFAULT_BRAND}/logo.png`}
              link={brandData.website}
            />
          </div>
        </If>

        <If cond={waitingPayment}>
          <MyUbuntu
            onPurchase={this.requestConfirm}
            onCancel={this.requestCancel}
            snap={currSnap}
            cardImgRootUrl={cardImgRootUrl}
          />
        </If>

        <Loader
          visible={waitStoreToPay || waitPayToStore}
          label={
            waitStoreToPay
            ? 'You are being redirected to the payment portal my.ubuntu.com…'
            : (
              currSnap && currSnap.status === 'confirming1'
              ? 'Your payment was successful.'
              : 'Redirecting you to the store to complete installation…'
            )
          }
          label2={(
            <span style={{
              fontSize: '14px'
            }}>
              <a
                role='button'
                style={{
                  textDecoration: 'underline',
                  color: '#007AA6',
                }}
              >
                Click here
              </a>
              {' if you are not being redirected.'}
            </span>
          )}
        />
      </div>
    )
  }
}

export default App
