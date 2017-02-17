/* Rename the keys of an object
 *
 * Usage:
 *
 * const obj = { foo: 'a', bar: 'b' }
 * const mapping = { foo: 'abc', bar: 'def' }
 * console.log(renameKeys(obj, mapping))
 *
 * Output:
 *
 * { abc: 'a', def: 'b' }
*/
export function renameKeys(obj, keysMapping) {
  return Object.keys(obj).reduce((data, key) => {
    const finalKey = keysMapping[key]
    data[finalKey] = obj[key]
    return data
  }, {})
}

/* Math.random() with a seed
 * From http://stackoverflow.com/a/23304189/292500
 *
 * Usage:
 *
 * const random1 = seedRandom(42)
 * const random2 = seedRandom(random1())
 *
 * console.log(random1()) // always the same result
 */
export function seedRandom(seed) {
  return () => {
    seed = Math.sin(seed) * 10000
    return seed - Math.floor(seed)
  }
}
