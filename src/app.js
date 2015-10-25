import el from 'vdom-element'

import { selectGraph, fetchGraph } from './actions'
import UrlInput from './components/url-input'
import GraphTable from './components/graph-table'

function beforeMount (props) {
  return fetchGraph(props.graphId)
}

function beforeUpdate (prevProps, nextProps) {
  if (prevProps.graphId !== nextProps.graphId) {
    return fetchGraph(nextProps.graphId)
  }
}

function render (props) {
  const { graphId, graph, loading, error } = props

  return (
    <div>
      <UrlInput
        key="graphId"
        value={graphId}
        label="graph @id: "
        onChange={selectGraph}
      />
      { error ? (
        <div>error!</div>
      ) : loading ? (
        <div>loading...</div>
      ) : (
        <GraphTable graph={graph} />
      )}
    </div>
  )
}

module.exports = {
  beforeMount,
  beforeUpdate,
  render
}
