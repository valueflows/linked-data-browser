import { createAction } from 'redux-actions'
import { bind } from 'redux-effects'
import { fetch } from 'redux-effects-fetch'

import actionTypes from './action-types'

const selectResource = createAction(actionTypes.SELECT_RESOURCE)

const requestResource = createAction(actionTypes.REQUEST_RESOURCE)
const receiveResource = createAction(actionTypes.RECEIVE_RESOURCE)
const erroredResource = createAction(actionTypes.ERRORED_RESOURCE)

function fetchResource (id) {
  return [
    requestResource(),
    bind(
      fetch(id),
      json => {
        receiveResource(json.data)
      },
      erroredResource
    )
  ]
}

module.exports = {
  selectResource,
  fetchResource
}
