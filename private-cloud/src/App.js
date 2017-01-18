import React, { Component } from 'react'
import './App.css'

import Header from 'toolkit/Header/Header'
import Footer from 'toolkit/Footer/Footer'
import CardsList from 'toolkit/CardsList/CardsList'
import ContentWrapper from 'toolkit/ContentWrapper/ContentWrapper'

import cards from './cards-data'

import SnapPageWrapper from './SnapPage/SnapPageWrapper'
import Banner from './Banner/Banner'

import createHistory from 'history/createBrowserHistory'

const publicUrl = process.env.PUBLIC_URL

// @todo: Replace this url with the real snapweb link on the device
const snapwebUrl = 'http://localhost:3001/'
const history = createHistory()
const sections = ['service']
const bannerData = {
  photo: '',
  deviceName: 'Self-hosted private cloud suite',
  deviceId: 'An Ubuntu snap-based solution for forward-thinking enterprises to own and control their own data.',
}

function sectionFromPath(path) {
  return path === '/' ? 'home' : (
    sections.find(section => (
      path.startsWith(`/${section}`)
    )) || ''
  )
}

function serviceIdFromPath(path) {
  const parts = path.split('/').slice(1)
  return (parts[0] === 'service' && parts[1]) || ''
}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      installedServices: cards(7),
      location: history.location,
    }

    history.listen(this.handleNavigation.bind(this))

    this.onMenuItemClick = this.onMenuItemClick.bind(this)
  }

  handleNavigation(location) {
    this.setState({ location: location })
  }

  onMenuItemClick(id) {
    if (id === 'store') {
      const win = window.open(snapwebUrl, '_blank');
      if (win) {
        //Browser has allowed it to be opened
        win.focus();
      }
    } 
    if (id === 'home') history.push('/')
  }

  onOpenService(id) {
    history.push('/service/' + id)
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
              <div>
                <ContentWrapper>
                  <Banner
                    photo={bannerData.photo}
                    name={bannerData.deviceName}
                    id={bannerData.deviceId}
                  />
                </ContentWrapper>
                <ContentWrapper background bordered>
                  <CardsList
                    title='All Services'
                    cards={installedServices}
                    cardImgRootUrl={cardImgRootUrl}
                    onCardClick={this.onOpenService}
                  />
                </ContentWrapper>
              </div>
            )
            if (currentSection === 'service') return (
              <SnapPageWrapper
                cardImgRootUrl={cardImgRootUrl}
                snap={installedServices.find(service => (
                    service.id === serviceIdFromPath(location.pathname)
                  ))}
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
