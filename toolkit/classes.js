const entries = obj => (
  Object
    .keys(obj)
    .map(key => [key, obj[key]])
)

const classes = (names) => (
  entries(names)
    .filter(i => i[1])
    .map(i => i[0])
    .join(' ')
)

export default classes
