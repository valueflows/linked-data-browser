import el from 'vdom-element'

import { getReasoner } from './getters'
import { selectFocus, loadGraph } from './actions'
import Focus from './components/focus'
import NodeList from './components/node-list'
import QuadsTable from './components/quads-table'
import GraphList from './components/graph-list'

import prefixer from './util/prefixer'

function beforeMount (props) {
  return loadGraph(props.focusId)
}

function beforeUpdate (prevProps, nextProps) {
  if (prevProps.focusId !== nextProps.focusId) {
    return loadGraph(nextProps.focusId)
  }
}

function render (props) {
  return (
    <div>
      <Focus { ...props } onSelect={selectFocus} />
      <GraphList { ...props } />
      <NodeList { ...props } onSelect={selectFocus} />
      <QuadsTable { ...props } />
    </div>
  )
}

module.exports = {
  beforeMount,
  beforeUpdate,
  render
}
