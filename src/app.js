import el from 'vdom-element'

import { getReasoner } from './getters'
import { selectFocus, fetchGraph } from './actions'
import UrlInput from './components/url-input'
import NodeList from './components/node-list'
import QuadsTable from './components/quads-table'

import prefixer from './util/prefixer'

function beforeMount (props) {
  return fetchGraph(props.focusId)
}

function beforeUpdate (prevProps, nextProps) {
  if (prevProps.focusId !== nextProps.focusId) {
    return fetchGraph(nextProps.focusId)
  }
}

function render (props) {
  const { focusId, loading, error} = props

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
        <div>
          <NodeList { ...props } />
          <QuadsTable { ...props } />
        </div>
      )}
    </div>
  )
}

module.exports = {
  beforeMount,
  beforeUpdate,
  render
}
