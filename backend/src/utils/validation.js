const objectHasKeys = (data, keys) => {
  let result = true
  keys.forEach(key => {
    if (data[key] === undefined) {
      result = false
    }
  })
  return result
}

module.exports = {
  objectHasKeys
}