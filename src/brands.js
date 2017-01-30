const TAGS = [
  ['Name', 'name'],
  ['Color', 'color'],
  ['Color2', 'color2'],
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

const brandContent = {
  lime: [
    'Name: Lime Microsystems',
    'Color: #BAD72D',
    'Color2: #2E893A',
    'Device Name: LimeNET',
    'Device ID: LimeSDR LM677 NLM871000',
  ].join('\n'),
  bosch: [
    'Name: BOSCH',
    'Color: #FE000C',
    'Device Name: Smart Home Controller',
    'Device ID: Bosch 8750000001 4057749314475',
  ].join('\n'),
  keymile: [
    'Name: KEYMILE',
    'Color: #FF7301',
    'Color2: #FF7301',
    'Device Name: OrcaX access node',
    'Device ID: OrcaX MX1 (VDSL2) HAJA77669A',
  ].join('\n'),
}

function fetchBrandSettings(brandId) {
  return Promise.resolve(brandContent[brandId])
  // fetch(`${baseUrl}/${id}/settings.txt`)
  //   .catch(reason => Promise.resolve(null))
  //   .then(res => res? res.text() : null)
}

function getBrandsIndex(url) {
  return Promise.resolve([
    'lime' //, 'keymile', 'bosch',
  ])
  // return fetch(url)
  //   .then(res => res.text())
  //   .then(data => (
  //     data
  //       .split('\n')
  //       .map(id => id.trim())
  //       .filter(id => id)
  //   ))
}

export default function createApi(baseUrl) {
  return function getBrands() {
    return getBrandsIndex(`${baseUrl}/brands-index.txt`)
      .then(ids => (
        Promise.all(
          ids.map(id => (
            fetchBrandSettings(id).then(text => ({
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
