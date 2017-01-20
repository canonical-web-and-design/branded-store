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
  'iRedMail',
  'Collabora',
]

const adminPages = [
  'https://wekan.io/',
  'https://nextcloud.com/',
  'https://rocket.chat/',
  'https://gogs.io/',
  'https://spreed.me/',
  'http://www.iredmail.org/',
  'https://www.collabora.com/',
]

const abouts = [
  'Wekan is an open source Kanban workflow tool that allows you to create boards, on which cards can be moved around between a number of columns. Boards can have many members, allowing for easy collaboration, just add everyone that should be able to work with you on the board to it, and you are good to go! ',
  'Nextcloud is a safe home for all your data. Access, share and protect your files, calendars, contacts and communication and more. Nextcloud comes with a feature rich set of pre-integrated services and is developed using a fully open source platform designed to give enterprises full control and privacy.',
  'Rocket.Chat is a dynamic and innovative toolkit providing group messaging and video communication and collaboration. It is a great solution for communities and companies wanting to privately host their own chat service.',
  'Gogs is a easy to use code repository service based on Git designed for self hosted environments. Gogs provides a full code management and distribution and is designed to help developers accelerate projects within a fully private environment.',
  'Spreed is a private video and chat messaging service based on WebRTC and is available through Nextcloud. The service brings you easy to use web conferencing, one to one calls, chat and is designed to give the enterprise full control of its communication.',
  'Iredmail is the complete self-hosted, open source mail server solution for enterprises. With iRedMail, you can deploy a full feature mail server in several minutes.',
  'Collaborative editing with LibreOffice using your own private cloud. Collabora Online is for enterprises that want a powerful self-hosted office suite that protects their privacy and allows them to keep full control of their sensitive corporate data.',
]
const actions = [
  'Running',
  'Stopped'
]

const history = [
  'Started 19/01/2017 00:00:00'
]

// Generate cards
function cards(count) {
  const cards = []
  let name = ''
  let about = ''

  if (count > names.length) count = names.length

  while (count--) {
    name = names[names.length - count - 1]
    about = abouts[names.length - count - 1]
    cards.push({
      id: name.toLowerCase(),
      name: name,
      about: about,
      action: actions[0],
      image: name.toLowerCase(),
      adminPage: adminPages[names.length - count - 1],
      history: history.slice(), //always create a new history instance
    })
  }
  return cards
}

export default cards
