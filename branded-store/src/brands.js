const TAGS = [
  ['Name', 'name'],
  ['Color', 'color'],
  ['Device Name', 'deviceName'],
  ['Device ID', 'deviceId'],
]

function parseBrandSettings(data) {
  const brand = {}
  const lines = data.split('\n')
  lines.forEach(line => {
    const tag = TAGS.find(tag => line.startsWith(`${tag[0]}:`))
    if (!tag) return
    const value = line.split(tag[0] + ':')[1]
    if (!value) return
    brand[tag[1]] = value.trim()
  })
  return brand.name? brand : null
}

export default function createApi(baseUrl) {
  return function getBrands() {
    return fetch(`${baseUrl}/brands-index.txt`)
      .then(res => res.text())
      .then(data => (
        data
          .split('\n')
          .map(id => id.trim())
          .filter(id => id)
      ))
      .then(ids => (
        Promise.all(
          ids.map(id => (
            fetch(`${baseUrl}/${id}/settings.txt`)
              .catch(reason => Promise.resolve(null))
              .then(res => res? res.text() : null)
              .then(text => ({
                id: id,
                text: text,
              }))
          ))
        )
      ))
      .then(brands => (
        brands
          .filter(brand => brand.text)
          .map(brand => (
            Object.assign(
              { id: brand.id },
              parseBrandSettings(brand.text)
            )
          ))
          .filter(brand => brand)
      ))
  }
}
