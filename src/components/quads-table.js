import el from 'vdom-element'
import { Util as N3Util } from 'n3'

function render (props) {
  const { quads, prefixes } = props

  let prefix = prefixer(prefixes)

  return (
    <div class="QuadsTable-container">
      <table class="QuadsTable-table">
        <thead>
          <tr>
            <td class="subject">subject</td>
            <td class="predicate">predicate</td>
            <td class="object">object</td>
            <td class="graph">graph</td>
          </tr>
        </thead>
        <tbody>
          { quads ? quads.map(function (quad) {
              return <tr>
                <td class="subject">{ prefix(quad.subject) }</td>
                <td class="predicate">{ prefix(quad.predicate) }</td>
                <td class="object">{ prefix(quad.object) }</td>
                <td class="graph">{ prefix(quad.graph) }</td>
              </tr>
          }) : null }
        </tbody>
      </table>
    </div>
  )
}

function prefixer (prefixes) {
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

module.exports = { render }
