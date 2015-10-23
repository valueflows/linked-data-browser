import createActionTypes from 'create-action-types'

const actionTypes = createActionTypes([
  'SELECT_RESOURCE',
  'REQUEST_RESOURCE',
  'RECEIVE_RESOURCE',
  'ERRORED_RESOURCE'
])

module.exports = actionTypes
