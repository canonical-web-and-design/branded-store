import axios from 'axios'

// axios parameters
function axiosParams(cancel) {
  return {
    // see https://github.com/mzabriskie/axios#cancellation
    // canceltoken: new axios.cancelToken(cancel)
  }
}

// transform an object into a query string
function queryString(query) {
  return Object.keys(query).reduce((q, key, i) => (
    q + `${i === 0? '?' : '&'}${key}=${encodeURIComponent(query[key])}`
  ), '')
}

// An API URL, based on three parameters:
//  - Base API URL
//  - Desired path
//  - Query string (automatically URI encoded)
function url(baseUrl, path, query) {
  return `${baseUrl}/${path}${queryString(query)}`
}

// Get an URL or null based on the action
function actionUrl(baseUrl, action, data) {
  if (action === 'enable') {
    return url(baseUrl, `packages/internal/${data.name}`, { operation: 'enable' })
  }
  if (action === 'disable') {
    return url(baseUrl, `packages/internal/${data.name}`, {operation: 'disable'})
  }
  return null
}

export default function createApi(baseUrl) {

  const callbacks = []

  // let cancel = () => {}

  const listen = (cb) => {
    callbacks.push(cb)
  }

  // const broadcast = (message) => {
  //   callbacks.forEach(cb => cb(message))
  // }

  const request = (action, data) => {

    const url = actionUrl(baseUrl, action, data)
    if (!url) return

    axios.get(url, axiosParams())
  }

  return {
    listen,
    request,
  }
}
