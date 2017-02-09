export function renameKeys(obj, keysMapping) {
  return Object.keys(obj).reduce((data, key) => {
    const finalKey = keysMapping[key]
    data[finalKey] = obj[key]
    return data
  }, {})
}
