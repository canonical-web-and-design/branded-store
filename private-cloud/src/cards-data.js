function randomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const imagesCount = 11

const names = [
  'Wekan',
  'Nextcloud',
  'Rocketchat',
  'Gogs',
  'Spreed',
  'iredmail',
]

const authors = [
  'Pierre-Andre Morey',
]

const actions = [
  'Running',
]

// Generate cards
function cards(count) {
  const cards = []
  let name = ''

  if (count > names.length) count = names.length

  while (count--) {
    name = names[names.length - count - 1]
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
