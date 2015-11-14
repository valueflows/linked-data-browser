/** @jsx el */
const el = require('vdom-element')
const sheetify = require('sheetify')

const { selectFocus, selectView, loadGraph } = require('./actions')
const FocusSelector = require('./components/focus-selector')
const ViewSelector = require('./components/view-selector')
const GraphList = require('./components/graph-list')

const prefix = sheetify('./app.css')

module.exports = {
  beforeMount,
  beforeUpdate,
  render
}

function beforeMount (props) {
  if (props.focusId) return loadGraph(props.focusId)
}

function beforeUpdate (prevProps, nextProps) {
  if (prevProps.focusId !== nextProps.focusId) {
    return loadGraph(nextProps.focusId)
  }
}

function render (props) {
  const { focusId, focus, view } = props
  const View = view && view.Component

  if (focus) {
    props = { ...props, nodes: { [focusId]: focus } }
  }

  return (
    <div className={prefix}>
      <FocusSelector { ...props } focusId={focusId} onSelect={selectFocus} />
      <GraphList { ...props } />
      <ViewSelector { ...props } onSelect={selectView} />
      { View ? <View { ...props } onSelect={selectFocus} /> : null }
    </div>
  )
}
