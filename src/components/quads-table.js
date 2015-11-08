/** @jsx el */
const el = require('vdom-element')
const sheetify = require('sheetify')

const prefix = sheetify('./quads-table.css')

module.exports = render

function render (props) {
  const { quads, prefixer } = props

  return (
    <div className={ prefix }>
      <table>
        <thead>
          <tr>
            <td className='subject'>subject</td>
            <td className='predicate'>predicate</td>
            <td className='object'>object</td>
            <td className='graph'>graph</td>
          </tr>
        </thead>
        <tbody>
          {
            quads ? quads.map((quad) => {
              return <tr>
                <td className='subject'>{ prefixer(quad.subject) }</td>
                <td className='predicate'>{ prefixer(quad.predicate) }</td>
                <td className='object'>{ prefixer(quad.object) }</td>
                <td className='graph'>{ prefixer(quad.graph) }</td>
              </tr>
            }) : null
          }
        </tbody>
      </table>
    </div>
  )
}
