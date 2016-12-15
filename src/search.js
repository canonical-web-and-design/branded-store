import cards from './cards-data'
import apps from './apps-data'

function randomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
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
  icon: `app-${randomInt(0, 11) + 1}`,
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

function search(query) {
  query = query.trim()

  if (!query) {
    return { groups: [], tags: [] }
  }

  const fullResults = {
    groups: [],
    tags: [],
  }

  const searchResults = apps.search(query, 5)
  const categoryResults = searchCategories(query, 3)

  if (searchResults.length) {
    fullResults.groups.push({
      groupName: 'Apps',
      items: searchResults.map((item, i) => ({
        icon: item.image,
        name: item.name,
        author: item.author,
        rating: 6,
        price: 'Free',
      }))
    })
  }

  if (categoryResults.length) {
    fullResults.groups.push({
      groupName: 'Categories',
      items: categoryResults,
    })
  }


  // fullResults.groups: [
  //     {
  //       groupName: 'Categories',
  //       items: cards(1).map(card => ({
  //         icon: card.image,
  //         name: 'Games',
  //       })),
  //     },
  //     // {
  //     //   groupName: 'Suggestions',
  //     //   items: cards(3).map((card, i) => {
  //     //     return {
  //     //       icon: card.image,
  //     //       name: [ 'Gameloft', 'Game Insight', 'Gamehouse' ][i],
  //     //       author: [ 'Tom Dryer', 'KDE', 'VideoLAN' ][i],
  //     //       rating: 6,
  //     //       price: 'Free',
  //     //     }
  //     //   })
  //     // },
  //   ],

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

  return fullResults
}

export default search
