import axios from 'axios'
// import cards from './cards-data'
// import apps from './apps-data'

const DEFAULT_ICON = 'https://myapps.developer.ubuntu.com/site_media/appmedia/2016/01/logo-ubuntu_cof-orange-hex_1.png'

function randomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

function apiSearchUrl(query) {
  return `https://search.apps.ubuntu.com/api/v1/snaps/search?q=${encodeURIComponent(query)}&size=5`
}

const categories = [
  'Games',
  'Business',
  'Education',
  'Lifestyle',
  'Entertainment',
  'Utilities',
  'Travel',
  'Book',
  'Health and Fitness',
  'Food and Drink',
  'Productivity',
  'Music',
  'Sports',
  'Reference',
  'Photo and Video',
  'Finance',
  'News',
  'Social Networking',
  'Medical',
  'Navigation',
].map(cat => ({
  name: cat,
  icon: `${process.env.PUBLIC_URL}/icons/small/app-${randomInt(0, 11) + 1}.png`,
}))

function searchCategories(terms, count=3) {
  const found = []
  terms = terms.trim().toLowerCase()
  if (!terms) {
    return []
  }
  for (let cat of categories) {
    if (cat.name.toLowerCase().includes(terms)) {
      found.push(cat)
    }
    if (found.length >= count) {
      return found
    }
  }
  return found
}

// Transforms an app from the API into a simpler data structure
function appFromApi(data) {
  return {
    // icon: item.image,
    name: data.title,
    author: data.publisher,
    rating: data.ratings_average,
    icon: data.icon_url || DEFAULT_ICON,
    price: data.price === 0? 'Free' : `$${data.price}`,
  }
}

function search(query, cancelCallback) {

  const fullResults = {
    groups: [],
    tags: [],
  }

  query = query.trim()

  if (!query) {
    return Promise.resolve(fullResults)
  }

  // const searchResults = apps.search(query, 5)
  const categoryResults = searchCategories(query, 3)

  if (categoryResults.length) {
    fullResults.groups.push({
      groupName: 'Categories',
      items: categoryResults,
    })
  }

  fullResults.tags = [
    { name: 'Action', count: 19 },
    { name: 'Adventure', count: 19 },
    { name: 'Role-playing', count: 16 },
    { name: 'Gorgeous', count: 14 },
    { name: 'Fantasy', count: 9 },
    { name: 'Sci-Fi', count: 51 },
    { name: 'Strategy', count: 75 },
    { name: 'Kids', count: 63 },
    { name: 'Arcade', count: 11 },
    { name: 'Sports', count: 7 },
    { name: 'Simulation', count: 38 },
    { name: 'Puzzle', count: 4 },
    { name: 'Family', count: 17 },
  ]

  return axios
    .get(apiSearchUrl(query), {
      cancelToken: new axios.CancelToken(cancelCallback),
    })
    .then(res => (
      res.data._embedded && res.data._embedded['clickindex:package']
    ) || [])
    .then(packages => packages.map(appFromApi))
    .then(apps => {
      if (apps.length) {
        fullResults.groups.push({
          groupName: 'Apps',
          items: apps,
        })
      }
      return fullResults
    })

  // return Promise.resolve(fullResults)

  // if (searchResults.length) {
  //   fullResults.groups.push({
  //     groupName: 'Apps',
  //     items: searchResults.map((item, i) => ({
  //       icon: item.image,
  //       name: item.name,
  //       author: item.author,
  //       rating: 6,
  //       price: 'Free',
  //     }))
  //   })
  // }
}

export default search
