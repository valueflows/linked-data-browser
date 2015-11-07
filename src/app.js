import el from 'vdom-element'

import { getReasoner } from './getters'
import { selectFocus, selectView, loadGraph } from './actions'
import FocusSelector from './components/focus-selector'
import ViewSelector from './components/view-selector'
import NodeList from './components/node-list'
import QuadsTable from './components/quads-table'
import GraphList from './components/graph-list'

import prefixer from './util/prefixer'

function beforeMount (props) {
  if (props.focusId)
    return loadGraph(props.focusId)
}

function beforeUpdate (prevProps, nextProps) {
  if (prevProps.focusId !== nextProps.focusId) {
    return loadGraph(nextProps.focusId)
  }
}

function render (props) {
  const { focusId, focus, views, view } = props
  const View = view && view.Component

  if (focus) {
    props = { ...props, nodes: { [focusId]: focus } }
  }

  return (
    <div>
      <FocusSelector { ...props } focusId={focusId} onSelect={selectFocus} />
      <GraphList { ...props } />
      <ViewSelector { ...props } onSelect={selectView} />
      { View ? <View { ...props } onSelect={selectFocus} /> : null }
    </div>
  )
}

module.exports = {
  beforeMount,
  beforeUpdate,
  render
}
