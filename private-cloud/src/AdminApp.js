import React, { Component } from 'react'
import './AdminApp.css'

import If from 'toolkit/If'
import Header from 'toolkit/Header/Header'
import Footer from 'toolkit/Footer/Footer'

import createServices from './services-data'

import HomePage from './HomePage'
import ServicePage from './ServicePage'

import createHistory from 'history/createBrowserHistory'

const publicUrl = process.env.PUBLIC_URL

// @todo: Replace this url with the real snapweb link on the device
const snapwebUrl = 'http://localhost:3001/'

// @todo: Come up with a better admin profile name
const defaultProfileName = 'Admin' 
const history = createHistory()
const sections = ['service']

const brandData = {
    name: 'Ubuntu',
    id: 'ubuntu',
    color: '#E95420',
}

const bannerData = {
  photo: 'banner-photo.png', 
  deviceName: 'Ubuntu self-hosted private cloud suite',
  deviceId: 'System Admin',
  //secondaryColor: '#19B6EE',
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

function openNewTab(url) {
  const win = window.open(url, '_blank'); 
  if (win) {
    //Browser has allowed it to be opened
    win.focus();
  }
}

function getTimeStamp() {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth();
  const yyyy = today.getFullYear();
  let hours = today.getHours()
  let mins = today.getMinutes()
  let secs = today.getSeconds()

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  if(dd<10) dd='0'+dd
  if(hours<10) hours='0'+hours
  if(mins<10) mins='0'+mins
  if(secs<10) secs='0'+secs

  return dd+' '+monthNames[mm]+' '+yyyy+' '+hours+':'+mins+':'+secs;
}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      installedServices: createServices(),
      location: history.location,
    }

    history.listen(this.handleNavigation.bind(this))

    this.onMenuItemClick = this.onMenuItemClick.bind(this)
    this.onRequestStop = this.onRequestStop.bind(this)
    this.onRequestStart = this.onRequestStart.bind(this)
    this.onRequestAdminPage = this.onRequestAdminPage.bind(this)
    this.onRequestServicePage = this.onRequestServicePage.bind(this)
  }

  findServiceById(id) {
    return this.state.installedServices.find(service => (service.id === id))
  }

  handleNavigation(location) {
    this.setState({ location: location })
    window.scrollTo(0, 0)
  }

  onMenuItemClick(id) {
    if (id === 'store') {
      openNewTab(snapwebUrl)
    } 
    if (id === 'home') history.push('/')
  }

  onOpenService(id) {
    history.push('/service/' + id)
  }

  onRequestStop(id) {
    const newServices = this.state.installedServices
    const index = this.state.installedServices.findIndex(service => (
                                                      service.id === id))
    if (newServices[index].action === 'Running') {
      newServices[index].action = 'Stopped'
      newServices[index].history.unshift(['Stopped', getTimeStamp()])
      this.setState({installedServices: newServices})
    }
  }
  onRequestStart(id) {
    const newServices = this.state.installedServices
    const index = this.state.installedServices.findIndex(service => (
                                                      service.id === id))
    if (newServices[index].action === 'Stopped') {
      newServices[index].action = 'Running'
      newServices[index].history.unshift(['Running', getTimeStamp()])
      this.setState({installedServices: newServices})
    }
  }

  onRequestAdminPage(id) {
    const service = this.findServiceById(id)
    if (service) openNewTab(service.adminPage)
  }

  onRequestServicePage(id) {
    const service = this.findServiceById(id)
    if (service) openNewTab(service.servicePage)
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
          name={brandData.name}
          logo={`${publicUrl}/brands/${brandData.id}/logo.png`}
          customColor={brandData.color}
          profilename={defaultProfileName}
        />

        <main className='App-content'>
          <If cond={currentSection === 'home'}>
            <HomePage
              bannerData={bannerData}
              cardImgRootUrl={cardImgRootUrl}
              services={installedServices}
              onOpenService={this.onOpenService}
            />
          </If>
          <If cond={currentSection === 'service'}>
            <ServicePage
              cardImgRootUrl={cardImgRootUrl}
              service={installedServices.find(service => (
                  service.id === serviceIdFromPath(location.pathname)
                ))}
              isRunning={installedServices.find(service => (
                  service.id === serviceIdFromPath(location.pathname) && service.action === 'Running'
                ))}
              onRequestStop={this.onRequestStop}
              onRequestStart={this.onRequestStart}
              onRequestAdminPage={this.onRequestAdminPage}
              onRequestServicePage={this.onRequestServicePage}
            />
          </If>
        </main>

        <Footer 
          firstLine={null}
          copyright={`© ${(new Date()).getFullYear()} ${brandData.name}`}
          logo={`${publicUrl}/brands/${brandData.id}/logo.png`}
        />
      </div>
    )
  }
}

export default App
