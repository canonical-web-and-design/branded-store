import snaps, {
  featuredSnaps,
} from './snaps-index'

function snapListToArray(ids) {
  return Array.from(new Set(
    (ids || '').split(',')
      .map(id => snaps.find(snap => snap.id === id))
      .filter(snap => snap)
  ))
}

export default function createSnapApi() {
  const listeners = []
  const listen = fn => {
    listeners.push(fn)
  }

  let installing = []

  const installingTick = () => {
    installing = installing
      .map(item => ({
        id: item.id,
        progress: item.progress + 1, // from 0 to 10
      }))
      .filter(item => {
        if (item.progress < 10) {
          return true
        }

        // ready to be installed
        const installed = snapListToArray(
          localStorage.getItem('installed-snaps')
        ).map(snap => snap.id)

        if (installed.indexOf(item.id) > -1) return false
        installed.push(item.id)
        localStorage.setItem('installed-snaps', installed.join(','))
        return false
      })

    listeners.forEach(fn => {
      fn({
        type: 'INSTALL_PROGRESS',
        installing: installing.map(item => ({
          id: item.id,
          progress: item.progress / 10,
        }))
      })
    })

    if (installing.length > 0) {
      setTimeout(installingTick, 5000)
    }
  }

  const install = snapId => {
    installing.push({
      id: snapId,
      progress: 0,
    })
    installingTick()
  }

  return {
    listen,
    snap,
    install,
    installed,
    featured,
  }
}

// Get a single snap by id
function snap(id) {
  const snap = snaps.find(snap => snap.id === id)
  return snap
    ? Promise.resolve(snap)
    : Promise.reject(new Error(`Snap “${id}” not found`))
}

// Get a list of installed snaps
function installed() {
  const ids = localStorage.getItem('installed-snaps')
  return Promise.resolve(snapListToArray(ids))
}

// Get the featured snaps from the store
function featured() {
  return Promise.resolve(
    featuredSnaps
      .map(id => snaps.find(snap => snap.id === id))
      .filter(snap => snap)
  )
}
