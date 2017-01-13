import React, { Component } from 'react'
import './App.css'

import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'
import Header from 'toolkit/Header/Header'
import Footer from 'toolkit/Footer/Footer'
import CardsList from 'toolkit/CardsList/CardsList'
import SnapPage from 'toolkit/SnapPage/SnapPage'
import DeviceBanner from 'toolkit/DeviceBanner/DeviceBanner'
import ReviewList from 'toolkit/ReviewList/ReviewList'

import createHistory from 'history/createBrowserHistory'
import * as snapApi from './snaps/snap-api'
import createBrands from './brands'

const publicUrl = process.env.PUBLIC_URL
const history = createHistory()
const sections = [ 'store', 'settings', 'snap' ]

const getBrands = createBrands(`${publicUrl}/brands`)

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
    }

    history.listen(this.handleNavigation.bind(this))

    this.onMenuItemClick = this.onMenuItemClick.bind(this)
    this.onCardClick = this.onCardClick.bind(this)
    this.reloadBrands = this.reloadBrands.bind(this)
    this.changeBrand = this.changeBrand.bind(this)
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
        this.setState({ snapPageSnap: snap })
      })
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

  changeBrand(event) {
    this.setState({
      brand: Number(event.currentTarget.value),
    })
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
      brands,
      brand,
    } = this.state

    const currentSection = sectionFromPath(location.pathname)
    const cardImgUrl = `${publicUrl}/icons/cards/`

    const brandData = brands[brand] || {
      deviceName: 'Connected grid router',
      deviceId: 'Cisco CGR1120 C02PQ53JFVH8',
    }

    return (
      <div className='App'>

        <style>{`
          .App a {
            color: ${brandData.color || '#E95420'}
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
              <div>
                <ContentWrapper>
                  <DeviceBanner
                    name={brandData.deviceName}
                    id={brandData.deviceId}
                  />
                </ContentWrapper>
                <ContentWrapper background bordered>
                  <div className='App-installedSnaps'>
                    <CardsList
                      title='Installed Snaps'
                      cards={installedSnaps}
                      cardImgUrl={cardImgUrl}
                      onCardClick={this.onCardClick}
                    />
                  </div>
                </ContentWrapper>
              </div>
            )
            if (currentSection === 'store') return (
              <ContentWrapper>
                <div className='App-store'>
                  <CardsList
                    title='Featured Snaps'
                    cards={featuredSnaps}
                    cardImgUrl={cardImgUrl}
                    onCardClick={this.onCardClick}
                  />
                </div>
              </ContentWrapper>
            )
            if (currentSection === 'snap') return (
              <div className='App-snapPage'>
                <SnapPage
                  snap={snapPageSnap}
                  icon={`${cardImgUrl}${snapPageSnap && snapPageSnap.id}.png`}
                >
                  <ContentWrapper bordered>
                    <ReviewList />
                  </ContentWrapper>
                </SnapPage>
              </div>
            )
          })()}
        </main>

        <Footer
          firstLine={
            <span className='ThemeChanger'>
              <select
                disabled={!brands.length}
                onChange={this.changeBrand}
                value={'select'}
              >
                <option value='select'>Select a brand</option>
                <option value='-1'>Ubuntu</option>
                {brands.map((brand, i) => (
                  <option
                    key={i}
                    value={i}
                  >{brand.brand}</option>
                ))}
              </select>
              {' '}
              <a
                role='button'
                onClick={this.reloadBrands}
              >
                reload
              </a>
            </span>
          }
        />
      </div>
    )
  }
}

export default App
