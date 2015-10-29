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
      return renderNode({ ...props, node, nodeId, })
    }) : null
  }</ul>
}

function renderNode(props) {
  const { node, nodeId, prefixer } = props

  return <li className="NodeList-item">
    <h2 className="NodeList-subject">
      { prefixer(nodeId) }
    </h2>
    <ul className="NodeList-predicates">{
      map(node, (objects, predicate) => {
        return <li className="NodeList-predicate-objects">
          <h3 className="NodeList-predicate">
            { prefixer(predicate) }
          </h3>
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

  const isLink = N3Util.isIRI(object)

  const onClick =  isLink ?
    onClickObject(props) : noop

  const style = {
    cursor: isLink ? 'pointer' : undefined
  }

  return <h4
    className="NodeList-object"
    style={style}
    ev-click={onClick}
  >
    { prefixer(object) }
  </h4>
}

function onClickObject ({ object, onSelect }) {
  return (ev) => {
    ev.preventDefault()
    return onSelect(object)
  }
}

function noop () {}
