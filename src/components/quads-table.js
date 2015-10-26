import el from 'vdom-element'
import { Util as N3Util } from 'n3'

export default function render (props) {
  const { quads, prefixer } = props

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
                <td class="subject">{ prefixer(quad.subject) }</td>
                <td class="predicate">{ prefixer(quad.predicate) }</td>
                <td class="object">{ prefixer(quad.object) }</td>
                <td class="graph">{ prefixer(quad.graph) }</td>
              </tr>
          }) : null }
        </tbody>
      </table>
    </div>
  )
}
