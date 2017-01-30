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

  let authTimer = -1
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

    if (snap.price !== 'free'
        && snap.status !== 'confirming1'
        && snap.status !== 'confirming2'
    ) {
      // snap.status = 'wait-signin'
      // snap.status = 'authorizing'

      snap.status = 'wait-authorize'

      // eslint-disable-next-line
      authorize(snapId)

      // installingTick()
      // emit('ALL_SNAPS', { snaps: allSnaps })
      return
    }

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

  const signin = (snapId) => {
    const snap = allSnaps.find(snap => snap.id === snapId)
    if (!snap || snap.status !== 'wait-signin') return
    snap.status = 'signing-in'
    emit('ALL_SNAPS', { snaps: allSnaps })
    clearTimeout(authTimer)
    authTimer = setTimeout(() => {
      snap.status = 'wait-authorize'
      emit('ALL_SNAPS', { snaps: allSnaps })
    }, 1000)
  }

  const authorize = (snapId) => {
    const snap = allSnaps.find(snap => snap.id === snapId)
    if (!snap || snap.status !== 'wait-authorize') return
    snap.status = 'authorizing'
    emit('ALL_SNAPS', { snaps: allSnaps })
    clearTimeout(authTimer)
    authTimer = setTimeout(() => {
      snap.status = 'wait-confirm'
      emit('ALL_SNAPS', { snaps: allSnaps })
      window.scrollTo(0, 0)
    }, 1000)
  }

  const confirm = (snapId) => {
    const snap = allSnaps.find(snap => snap.id === snapId)
    if (!snap || snap.status !== 'wait-confirm') return
    snap.status = 'confirming1'
    emit('ALL_SNAPS', { snaps: allSnaps })
    clearTimeout(authTimer)
    authTimer = setTimeout(() => {
      snap.status = 'confirming2'
      emit('ALL_SNAPS', { snaps: allSnaps })
      authTimer = setTimeout(() => {
        window.scrollTo(0, 0)
        install(snapId)
      }, 1500)
    }, 1500)
  }

  const cancelPurchases = (except = null) => {

    const purchaseSteps = [
      'wait-signin',
      'signing-in',
      'wait-authorize',
      'authorizing',
      'wait-confirm',
      'confirming1',
      'confirming2',
    ]

    let touched = false

    clearTimeout(authTimer)
    authTimer = -1

    allSnaps.forEach(snap => {
      if (purchaseSteps.includes(snap.status) &&
          (except === null || except !== snap.id)
      ) {
        snap.status = 'uninstalled'
        touched = true
      }
    })

    if (touched) {
      emit('ALL_SNAPS', { snaps: allSnaps })
    }
  }

  return {
    listen,
    install,
    remove,
    signin,
    authorize,
    confirm,
    cancelPurchases,
  }
}
