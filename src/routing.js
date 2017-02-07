import miniroutes from 'miniroutes'
import createHistory from 'history/createHashHistory'

const ROUTES = [
  ['store', /^store$/],
  ['store-category', /^store\/category\/(.+)?/],
  ['settings', /^settings(?:\/(.+))?$/],
  ['snap', /^snap\/(.+)$/],
  ['snap-store', /^store\/snap\/(.+)$/],
  ['snap-category', /^store\/category\/([^\/]+)\/snap\/(.+)$/],
  ['home', /.*/],
]

// Mapping of section => route name.
// All the names defined in ROUTES should be in an array defined here.
const SECTIONS = {
  'store': ['store', 'store-category'],
  'settings': ['settings'],
  'snap': ['snap', 'snap-store', 'snap-category'],
  'home': ['home'],
}

// Return the section corresponding to a route name
export function routeSection(name) {
  return Object.keys(SECTIONS).find(
    n => SECTIONS[n].includes(name)
  )
}

export default function createRouting(callback) {
  const history = createHistory()
  const routing = miniroutes(ROUTES, callback)

  // First update based on the current path
  routing(history.location.pathname.slice(1))

  // Listen to history updates
  history.listen((location) => {
    routing(location.pathname.slice(1))
  })

  // Flow:
  //
  // update(pathname)
  //   => history.push(pathname)
  //   => history update event with newPath
  //   => routing(newPath)
  //   => routing callback is called with newRoute
  const update = (pathname) => {
    history.push(pathname)
  }

  return update
}
