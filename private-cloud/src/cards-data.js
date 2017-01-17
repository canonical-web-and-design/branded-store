function randomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const names = [
  'Wekan',
  'Nextcloud',
  'Rocketchat',
  'Gogs',
  'Spreed',
  'iredmail',
  'collabora',
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
      action: actions[randomInt(0, actions.length)],
      image: name.toLowerCase()
    })
  }
  return cards
}

export default cards
