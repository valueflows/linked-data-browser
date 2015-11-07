import el from 'vdom-element'
const sheetify = require('sheetify')
import { Util as N3Util } from 'n3'
import { map, mapValues } from 'lodash'

const prefix = sheetify('./node-list.css')

export default function render (props) {
  return <div className={prefix}>{
    renderNodes(props)
  }</div>
}

function renderNodes (props) {
  const { nodes } = props

  return <ul className="list">{
    nodes ? map(nodes, (node, nodeId) => {
      return renderNode({ ...props, node, nodeId, })
    }) : null
  }</ul>
}

function renderNode(props) {
  const { node, nodeId, prefixer } = props

  return <li className="item">
    <h2 className="subject">
      { renderLink({ ...props, link: nodeId }) }
    </h2>
    <ul className="predicates">{
      map(node, (objects, predicate) => {
        return <li className="predicate-objects">
          <h3 className="predicate">
            { renderLink({ ...props, link: predicate }) }
          </h3>
          <ul className="objects">{
            objects.map((object) => {
              return <li className="object">
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
    className="link"
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
