
const services = [
    {
      name: 'Wekan',
      description: 'Wekan is an open source Kanban workflow tool that allows you to create boards, on which cards can be moved around between a number of columns. Boards can have many members, allowing for easy collaboration, just add everyone that should be able to work with you on the board to it, and you are good to go! ',
      adminPage: 'https://wekan.io/',
      servicePage: 'https://wekan.io/',
      state: 'running',
      status: 'Running',
    },
    {
      name: 'Nextcloud',
      description: 'Nextcloud is a safe home for all your data. Access, share and protect your files, calendars, contacts and communication and more. Nextcloud comes with a feature rich set of pre-integrated services and is developed using a fully open source platform designed to give enterprises full control and privacy.',
      adminPage: 'https://nextcloud.com/',
      servicePage: 'https://nextcloud.com/',
      state: 'running',
      status: 'Running',
    },
    {
      name: 'Rocketchat',
      description: 'Rocket.Chat is a dynamic and innovative toolkit providing group messaging and video communication and collaboration. It is a great solution for communities and companies wanting to privately host their own chat service.',
      adminPage: 'https://rocket.chat/',
      servicePage: 'https://rocket.chat/',
      state: 'stopped',
      status: 'Stopped',
    },
    {
      name: 'Gogs',
      description: 'Gogs is a easy to use code repository service based on Git designed for self hosted environments. Gogs provides a full code management and distribution and is designed to help developers accelerate projects within a fully private environment.',
      adminPage: 'https://gogs.io/',
      servicePage: 'https://gogs.io/',
      state: 'running',
      status: 'Running',
    },
    {
      name: 'Spreed',
      description: 'Spreed is a private video and chat messaging service based on WebRTC and is available through Nextcloud. The service brings you easy to use web conferencing, one to one calls, chat and is designed to give the enterprise full control of its communication.',
      adminPage: 'https://spreed.me/',
      servicePage: 'https://spreed.me/',
      image: 'spreed2',
      state: 'running',
      status: 'Running',
    },
    {
      name: 'iRedMail',
      description: 'Iredmail is the complete self-hosted, open source mail server solution for enterprises. With iRedMail, you can deploy a full feature mail server in several minutes.',
      adminPage: 'http://www.iredmail.org/',
      servicePage: 'http://www.iredmail.org/',
      state: 'running',
      status: 'Running',
    },
    {
      name: 'Collabora Online',
      id: 'collabora',
      description: 'Collaborative editing with LibreOffice using your own private cloud. Collabora Online is for enterprises that want a powerful self-hosted office suite that protects their privacy and allows them to keep full control of their sensitive corporate data.',
      adminPage: 'https://www.collabora.com/',
      servicePage: 'https://www.collabora.com/',
      state: 'running',
      status: 'Running',
    }
  ]

const defaultHistory = [
  ['Running', '19 Jan 2017 00:00:00']
]

const defaultDetails = [
  ['Category', 'Databases'],
  ['Size', '65.7MB'],
  ['Version', '3.7'],
  ['Channel', 'Stable'],
  ['Updated', '12 Aug 2016 12:37:06'],
]

const defaultInterfaces = [
  'Network',
  'Network Bind',
  'Mount Observe',
]

// Generate services data
function servicesData() {

  // add attributes that are the same for each service
  services.forEach(function (element) {
    if (!element.id) element.id = element.name.toLowerCase()
    if (!element.image) element.image = element.id
    if (!element.details) element.details = defaultDetails.slice()
    if (!element.interfaces) element.interfaces = defaultInterfaces.slice()
    if(!element.history) element.history = defaultHistory.slice()

    // @todo: change this attribute to 'status' once the toolkit CardList api has been improved
    element.action = element.status
  })
    
  return services
}

export default servicesData
