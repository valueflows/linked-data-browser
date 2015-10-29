import el from 'vdom-element'
import { Util as N3Util } from 'n3'
import { map, mapValues } from 'lodash'

export default function render (props) {
  return <div className="NodeList-container">{
    renderNodes(props)
  }</div>
}

function renderNodes (props) {
  const { nodes } = props

  return <ul className="NodeList-list">{
    nodes ? map(nodes, (node, nodeId) => {
      return renderNode({ ...props, attrs: node, id: nodeId, })
    }) : null
  }</ul>
}

function renderNode(props) {
  const { attrs, id, prefixer } = props

  return <li className="NodeList-item">
    <h3 className="NodeList-id">
      { prefixer(id) }
    </h3>
    <ul className="NodeList-attrs">{
      map(attrs, (objects, predicate) => {
        return <li className="NodeList-predicate-objects">
          <h4 className="NodeList-predicate">
            { prefixer(predicate) }
          </h4>
          <ul className="NodeList-objects">{
            objects.map((object) => {
              return <li className="NodeList-object">
                { renderObject({ ...props, object }) }
              </li>
            })
          }</ul>
        </li>
      })
    }</ul>
  </li>
}

function renderObject (props) {
  const { object, prefixer } = props

  if (N3Util.isIRI(object)) {
    return <a href="#" ev-click={onClickObject(props)}>
      { prefixer(object) }
    </a>
  } else {
    return object
  }
}

function onClickObject ({ object, selectFocus }) {
  return (ev) => {
    ev.preventDefault()
    return selectFocus(object)
  }
}
