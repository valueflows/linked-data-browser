import { Util as N3Util } from 'n3'

export default function createPrefixer (prefixes) {
  prefixes = prefixes || {}

  return (value) => {
    if (!N3Util.isIRI(value)) {
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

