import Papa from 'papaparse'

const pub = process.env.PUBLIC_URL

const TAGS = [
  ['Brand Name', 'brandName'],
  ['Website', 'website'],
  ['Color', 'color'],
  ['Color2', 'color2'],
  ['System Name', 'systemName'],
  ['Device Name', 'deviceName'],
  ['Device Name 2', 'deviceName2'],
]

const CSV_TAGS = {
  'Brand Name': 'brandName',
  'Brand URL': 'website',
  'Color 1': 'color',
  'Color 2': 'color2',
  'Product Name': 'deviceName',
  'Product Serial': 'systemName',
  'Documentation URL': 'docUrl',
  'Terms and condition URL': 'termsUrl',
}

function getBrandData(url) {
  return new Promise((resolve) => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: resolve,
    })
  })
  .then(rows => {
    const row = rows.data[0]
    return Object.keys(row).reduce((data, key) => {
      data[CSV_TAGS[key]] = row[key]
      return data
    }, {})
  })
}

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
  return brand
}

const brandContent = {
  ubuntu: [
    'Brand Name: Connected Grid Router',
    'Website: http://www.ubuntu.com/',
    'System Name: Apps',
    'Device Name: Cisco',
    'Device Name 2: CGR1120 C02PQ53JFVH8',
  ].join('\n'),
  lime: [
    'Brand Name: Lime Microsystems',
    'Website: http://www.limemicro.com/',
    'Color: #BAD72D',
    'Color2: #2E893A',
    'System Name: LimeNET',
    'Device Name: Lime SDR',
    'Device Name 2: LM677 NLM871000',
  ].join('\n'),
  bosch: [
    'Brand Name: BOSCH',
    'Color: #FE000C',
    'System Name: Smart Home',
    'Device Name: Bosch',
    'Device Name 2: 8750000001 4057749314475',
  ].join('\n'),
  keymile: [
    'Brand Name: KEYMILE',
    'Website: http://www.keymile.com',
    'Color: #FF7301',
    'Color2: #FF7301',
    'System Name: OrcaX',
    'Device Name: OrcaX MX1',
    'Device Name 2: (VDSL2) HAJA77669A',
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
     //'ubuntu',
     'lime',
     //'keymile',
    // 'bosch',
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
    return getBrandData(`${pub}/brand-settings/brand.csv`)
      .then(brandData => {
        return [
          Object.assign({ id: 'lime' }, brandData)
        ]
      })
  }
}
