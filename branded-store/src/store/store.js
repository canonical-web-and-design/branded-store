import allSnapsData, { featuredSnaps } from './snaps-index'

const INSTALL_TIME = 1000 * 10
const INSTALL_STEPS = 5

function parseIds(ids) {
  return Array.from(new Set(
    (ids || '').split(',').filter(snap => snap)
  ))
}

function createAllSnaps(snapsData) {
  const installedIds = parseIds(localStorage.getItem('installed-snaps'))
  return snapsData.map(snap => Object.assign({}, snap, {
    status: (
      installedIds.includes(snap.id) || snap.preinstalled
        ? 'installed'
        : 'uninstalled'
    ),
    installStart: -1,
    installProgress: -1,
  }))
}

export default function createStore(brand) {

  // All snaps with their status
  let allSnaps = createAllSnaps(allSnapsData)

  // Event emitter
  const listeners = []
  const emit = (type, data) => {
    const event = Object.assign({}, data, { type })
    listeners.forEach(fn => fn(event))
  }
  const listen = (fn) => {
    listeners.push(fn)
    emit('FEATURED_SNAPS', { ids: featuredSnaps })
    emit('ALL_SNAPS', { snaps: allSnaps })
  }

  const saveInstalledSnaps = () => {
    localStorage.setItem('installed-snaps', (
      allSnaps
        .filter(snap => snap.status === 'installed')
        .map(snap => snap.id)
    ).join(','))
  }

  let installingTimer = -1

  const installingTick = () => {
    clearTimeout(installingTimer)

    allSnaps = allSnaps.map(snap => {
      if (snap.status !== 'installing') return snap

      const progress = Math.round(
        (Date.now() - snap.installStart) / INSTALL_TIME * 10
      ) / INSTALL_STEPS

      // still installing
      if (progress <= 1) {
        return Object.assign({}, snap, {
          installProgress: progress,
        })
      }

      // install
      return Object.assign({}, snap, {
        installStart: -1,
        installProgress: -1,
        status: 'installed',
      })
    })

    // save the installed snaps
    saveInstalledSnaps()
    emit('ALL_SNAPS', { snaps: allSnaps })

    if (allSnaps.some(snap => snap.status === 'installing')) {
      installingTimer = setTimeout(installingTick, INSTALL_TIME / 10)
    }
  }

  const install = (snapId) => {
    const snap = allSnaps.find(snap => snap.id === snapId)
    if (!snap) return
    snap.status = 'installing'
    snap.installStart = Date.now()
    snap.installProgress = 0
    installingTick()
  }

  const remove = (snapId) => {
    const snap = allSnaps.find(snap => snap.id === snapId)
    if (snap.preinstalled) return
    snap.status = 'uninstalled'
    snap.installStart = -1
    snap.installProgress = -1
    saveInstalledSnaps()
    emit('ALL_SNAPS', { snaps: allSnaps })
  }

  return {
    listen: listen,
    install,
    remove,
  }
}
