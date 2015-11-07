const N3 = require('n3')

module.exports = createPrefixer

function createPrefixer (prefixes) {
  prefixes = prefixes || {}

  return (value) => {
    if (!N3.Util.isIRI(value)) {
      return value
    }
    Object.keys(prefixes).forEach((prefix) => {
      const expanded = prefixes[prefix]
      const prefixIndex = value.indexOf(expanded)
      if (prefixIndex === 0) {
        let sub = value.substr(expanded.length)
        if (!sub) value = prefix
        else value = `${prefix}:${sub}`
      }
    })
    return value
  }
}

