import el from 'vdom-element'

import { getReasoner } from './getters'
import { selectFocus, fetchGraph } from './actions'
import UrlInput from './components/url-input'
import QuadsTable from './components/quads-table'

function beforeMount (props) {
  return fetchGraph(props.focusId)
}

function beforeUpdate (prevProps, nextProps) {
  if (prevProps.focusId !== nextProps.focusId) {
    return fetchGraph(nextProps.focusId)
  }
}

function render (props) {
  const { focusId, quads, loading, error } = props

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
        <QuadsTable { ...props }/>
      )}
    </div>
  )
}

module.exports = {
  beforeMount,
  beforeUpdate,
  render
}
