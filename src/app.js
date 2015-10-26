import el from 'vdom-element'

import { getStore } from './getters'
import { selectFocus, fetchGraph } from './actions'
import UrlInput from './components/url-input'
import GraphTable from './components/graph-table'

function beforeMount (props) {
  return fetchGraph(props.focusId)
}

function beforeUpdate (prevProps, nextProps) {
  if (prevProps.focusId !== nextProps.focusId) {
    return fetchGraph(nextProps.focusId)
  }
}

function render (props) {
  const { focusId, graph, loading, error } = props

  const store = getStore(props)

  return (
    <div>
      <UrlInput
        key="focusId"
        value={focusId}
        label="@id: "
        onChange={selectFocus}
      />
      { error ? (
        <div>error!</div>
      ) : loading ? (
        <div>loading...</div>
      ) : (
        <GraphTable graph={store} />
      )}
    </div>
  )
}

module.exports = {
  beforeMount,
  beforeUpdate,
  render
}
