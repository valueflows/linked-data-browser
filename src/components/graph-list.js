import el from 'vdom-element'
import { Util as N3Util } from 'n3'
import { map, mapValues } from 'lodash'

export default function render (props) {
  return <div className="GraphList-container">
    <div className="GraphList-error">{
      props.error ? 'error!' : ''
    }</div>
    <ul className="GraphList-list">{
      props.graphs.map((graph) => {
        const statusName = getGraphStatus(graph)
        const statusStyle = getStatusName(graph)

        return <li className="GraphList-item">
          <div className="GraphList-id">
            { graph.id }
          </div>
          <div className="GraphList-status"
            style={statusStyle}
          >{ styleName }</div>
        </li>
      })
    }</ul>
  </div>
}

function getStatusName ({ error, result }) {
  if (error) {
    return 'errored'
  } else if (result === undefined) {
    return 'loading'
  } else {
    return 'success'
  }
}

function getStatusColor ({ status }) {
  switch (status) {
    case 'errored': 
      return { 
        color: 'red'
      }
    case 'loading':
      return { 
        color: 'blue'
      }
    case 'success':
      return { 
        color: 'green'
      }
  }
}
