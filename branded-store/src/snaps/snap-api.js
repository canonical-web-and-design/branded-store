import snaps, {
  featuredSnaps,
} from './snaps-index'

// Get a single snap by id
export function snap(id) {
  const snap = snaps.find(snap => snap.id === id)
  return snap
    ? Promise.resolve(snap)
    : Promise.reject(new Error(`Snap “${id}” not found`))
}

// Get a list of installed snaps
export function installed() {
  // const ids = localStorage.getItem('installed-snaps')
  const ids = 'discourse,docker,lxd'
  return Promise.resolve(ids
    ? ids.split(',')
        .map(id => snaps.find(snap => snap.id === id))
        .filter(snap => snap)
    : []
  )
}

// Install a snap
export function install() {
  // const snaps = localStorage.getItem('installed-snaps')
  // return Promise.resolve(snaps? snaps.split(',') : [])
}

// Get the featured snaps from the store
export function featured() {
  return Promise.resolve(
    featuredSnaps
      .map(id => snaps.find(snap => snap.id === id))
      .filter(snap => snap)
  )
}
