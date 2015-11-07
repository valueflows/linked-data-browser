import el from 'vdom-element'
const sheetify = require('sheetify')
import { Util as N3Util } from 'n3'

const prefix = sheetify('./quads-table.css')

export default function render (props) {
  const { quads, prefixer } = props

  return (
    <div className={ prefix }>
      <table>
        <thead>
          <tr>
            <td className="subject">subject</td>
            <td className="predicate">predicate</td>
            <td className="object">object</td>
            <td className="graph">graph</td>
          </tr>
        </thead>
        <tbody>
          { quads ? quads.map(function (quad) {
              return <tr>
                <td className="subject">{ prefixer(quad.subject) }</td>
                <td className="predicate">{ prefixer(quad.predicate) }</td>
                <td className="object">{ prefixer(quad.object) }</td>
                <td className="graph">{ prefixer(quad.graph) }</td>
              </tr>
          }) : null }
        </tbody>
      </table>
    </div>
  )
}
