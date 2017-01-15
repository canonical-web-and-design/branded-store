const classes = (names) => (
  Object.entries(names)
    .filter(i => i[1])
    .map(i => i[0])
    .join(' ')
)

export default classes
