function randomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const imagesCount = 11

const names = [
  'Docker',
  'VLC',
  'Krita',
  'Blender',
  'Hangups',
  'Cassandra',
  'Jenkins',
]

const authors = [
  'Pierre-Andre Morey',
]

const actions = [
  'Install',
  'Install',
  'Install',
  'Install',
  'Install',
  'Install',
  'Install',
  '$3.99',
  '$2.99',
  '$1.99',
]

// Generate cards
function cards(count) {
  const cards = []
  let name = ''
  while (count--) {
    name = names[randomInt(0, names.length)]
    cards.push({
      id: name.toLowerCase(),
      name: name,
      author: authors[randomInt(0, authors.length)],
      action: actions[randomInt(0, actions.length)],
      image: `app-${randomInt(0, imagesCount) + 1}`,
    })
  }
  return cards
}

export default cards
