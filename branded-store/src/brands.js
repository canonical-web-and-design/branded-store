const TAGS = [
  ['Folder', 'folder'],
  ['Brand', 'brand'],
  ['Color', 'color'],
  ['Device Name', 'deviceName'],
  ['Device ID', 'deviceId'],
]

function parseBrands(data) {
  const lines = data.split('\n')
  const brands = []
  lines.forEach(line => {
    const tag = TAGS.find(tag => line.startsWith(`${tag[0]}:`))
    if (!tag) return
    const value = line.split(tag[0] + ':')[1].trim()
    if (tag === TAGS[0]) {
      brands.push({ folder: value })
      return
    }
    brands[brands.length - 1][tag[1]] = value
  })
  return brands
}

export default function createApi(baseUrl) {
  return function getIndex() {
    return fetch(`${baseUrl}/index.txt`)
      .then(res => res.text())
      .then(parseBrands)
  }
}
