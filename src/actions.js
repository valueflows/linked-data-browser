import { createAction } from 'redux-actions'
import { bind } from 'redux-effects'
import { fetch } from './effects/fetch'
import { parse } from './effects/parse'

import actionTypes from './action-types'

const selectFocus = createAction(actionTypes.SELECT_FOCUS)

const requestGraph = createAction(actionTypes.REQUEST_GRAPH)
const receiveGraph = createAction(actionTypes.RECEIVE_GRAPH)
const setError = createAction(actionTypes.SET_ERROR)

function fetchGraph (id) {
  return [
    requestGraph(id),
    bind(
      fetch(id),
      parseGraph,
      setError
    )
  ]
}

function parseGraph (data) {
  return bind(
    parse(data),
    receiveGraph,
    setError
  )
}

module.exports = {
  selectFocus,
  fetchGraph
}
