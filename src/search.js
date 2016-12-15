import cards from './cards-data'

function search(query) {
  query = query.trim()

  if (!query) {
    return { groups: [], tags: [] }
  }

  return {
    groups: [
      {
        groupName: 'Categories',
        items: cards(1).map(card => ({
          icon: card.image,
          name: 'Games',
        })),
      },
      {
        groupName: 'Suggestions',
        items: cards(3).map((card, i) => ({
          icon: card.image,
          name: [ 'Gameloft', 'Game Insight', 'Gamehouse' ][i],
          author: [ 'Tom Dryer', 'KDE', 'VideoLAN' ][i],
          rating: 6,
          price: 'Free',
        }))
      },
      {
        groupName: 'Apps',
        items: cards(2).map((card, i) => ({
          icon: card.image,
          name: [ 'Gameloft', 'Game Insight', 'Gamehouse' ][i],
          author: [ 'Tom Dryer', 'KDE', 'VideoLAN' ][i],
          rating: 6,
          price: 'Free',
        }))
      },
    ],
    tags: [
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
    ],
  }
}

export default search
