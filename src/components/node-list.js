import el from 'vdom-element'
import { Util as N3Util } from 'n3'
import { map, mapValues } from 'lodash'

export default function render (props) {
  const { nodes, prefixer } = props

  return <div className="NodeList-container">{
    renderNodes({ nodes, prefixer })
  }</div>
}

function renderNodes({ nodes, prefixer }) {
  return <ul className="NodeList-list">{
    nodes ? map(nodes, (node, nodeId) => {
      return renderNode({ attrs: node, id: nodeId, prefixer })
    }) : null
  }</ul>
}

function renderNode({ attrs, id, prefixer }) {
  return <li className="NodeList-item">
    <h3 className="NodeList-id">
      { prefixer(id) }
    </h3>
    <ul className="NodeList-attrs">{
      map(attrs, (values, key) => {
        return <li className="NodeList-key-values">
          <h4 className="NodeList-key">
            { prefixer(key) }
          </h4>
          <ul className="NodeList-values">{
            values.map((value) => {
              return <li className="NodeList-value">
                { prefixer(value) }
              </li>
            })
          }</ul>
        </li>
      })
    }</ul>
  </li>
}
