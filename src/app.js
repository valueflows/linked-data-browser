import el from 'vdom-element'

import { selectResource, fetchResource } from './actions'

function beforeMount (props) {
  return fetchResource(props.resourceId)
}

function beforeUpdate (prevProps, nextProps) {
  if (prevProps.resourceId !== nextProps.resourceId) {
    return fetchResource(nextProps.resourceId)
  }
}

function render (props) {
  console.log("render", props)
  const { resourceId, resource, loading } = props

  return (
    <div>
      <div>{ resourceId }</div>
      <div>{ JSON.stringify(resource, null, 2) }</div>
      <div>{ loading }</div>
    </div>
  )
}

module.exports = {
  beforeMount,
  beforeUpdate,
  render
}
