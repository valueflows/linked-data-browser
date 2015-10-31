import el from 'vdom-element'
import { Util as N3Util } from 'n3'
import { map, mapValues } from 'lodash'

export default function render (props) {
  return <div className="GraphList-container">
    <div className="GraphList-error">{
      props.error ? 'error!' : ''
    }</div>
    <ul className="GraphList-list">{
      map(props.graphs, (graph, id) => {
        const statusName = getStatusName(graph)
        const statusStyle = getStatusStyle(statusName)

        return <li className="GraphList-item">
          <span className="GraphList-id">
            { id }
          </span>
          <span className="GraphList-status"
            style={statusStyle}
          >{ statusName }</span>
        </li>
      })
    }</ul>
  </div>
}

function getStatusName ({ error, content }) {
  if (error) {
    return 'errored'
  } else if (content === undefined) {
    return 'loading'
  } else {
    return 'success'
  }
}

function getStatusStyle (statusName) {
  switch (statusName) {
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
