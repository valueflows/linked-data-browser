import createActionTypes from 'create-action-types'

const actionTypes = createActionTypes([
  'SELECT_GRAPH',
  'REQUEST_GRAPH',
  'RECEIVE_GRAPH',
  'ERRORED_GRAPH'
])

module.exports = actionTypes
