import el from 'vdom-element'

function render (props) {
  const { graph } = props

  return (
    <div class="GraphTable-container">
      <table class="GraphTable-table">
        <thead>
          <tr>
            <td class="subject">subject</td>
            <td class="predicate">predicate</td>
            <td class="object">object</td>
            <td class="graph">graph</td>
          </tr>
        </thead>
        <tbody>
          { graph ? graph.map(function (quad) {
              return <tr>
                <td class="subject">{ toString(quad.subject) }</td>
                <td class="predicate">{ toString(quad.predicate) }</td>
                <td class="object">{ toString(quad.object) }</td>
                <td class="graph">{ toString(quad.graph) }</td>
              </tr>
          }) : null }
        </tbody>
      </table>
    </div>
  )
}

function toString (value) {
  return value ? value.toString() : ''
}

module.exports = { render }
