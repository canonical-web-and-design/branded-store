import entries from 'object.entries'

const classes = (names) => (
  entries(names)
    .filter(i => i[1])
    .map(i => i[0])
    .join(' ')
)

export default classes
