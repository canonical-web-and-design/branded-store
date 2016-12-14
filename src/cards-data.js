function randomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const images = [
  'docker',
  'cisco',
  'docker',
  'f5',
  'gravatar',
  'intel',
  'metaswitch',
  'onie',
  'orange',
  'paloalto',
  'purple',
  'snort',
].map(img => (
  `${process.env.PUBLIC_URL}/card-logos/${img}.png`
))

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
  '$3.99',
  '$2.99',
  '$1.99',
]

// Generate cards
function cards(count) {
  const cards = []
  while (count--) {
    cards.push({
      name: names[randomInt(0, names.length)],
      author: authors[randomInt(0, authors.length)],
      action: actions[randomInt(0, actions.length)],
      image: images[randomInt(0, images.length)],
    })
  }
  return cards
}

export default cards
