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
      { renderLink({ ...props, link: nodeId }) }
    </h2>
    <ul className="NodeList-predicates">{
      map(node, (objects, predicate) => {
        return <li className="NodeList-predicate-objects">
          <h3 className="NodeList-predicate">
            { renderLink({ ...props, link: predicate }) }
          </h3>
          <ul className="NodeList-objects">{
            objects.map((object) => {
              return <li className="NodeList-object">
                { renderLink({ ...props, link: object }) }
              </li>
            })
          }</ul>
        </li>
      })
    }</ul>
  </li>
}

function renderLink (props) {
  const { link, prefixer } = props

  const isLink = N3Util.isIRI(link)

  const onClick =  isLink ?
    onClickLink(props) : noop

  const style = {
    cursor: isLink ? 'pointer' : undefined
  }

  return <a
    className="NodeList-link"
    style={style}
    ev-click={onClick}
  >
    { prefixer(link) }
  </a>
}

function onClickLink ({ link, onSelect }) {
  return (ev) => {
    ev.preventDefault()
    return onSelect(link)
  }
}

function noop () {}
