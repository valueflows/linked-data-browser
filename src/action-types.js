import createActionTypes from 'create-action-types'

const actionTypes = createActionTypes([
  'SELECT_FOCUS',
  'REQUEST_GRAPH',
  'RECEIVE_GRAPH',
  'SET_ERROR'
])

module.exports = actionTypes
