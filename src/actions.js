import { createAction } from 'redux-actions'
import { bind } from 'redux-effects'
import { fetch } from './effects/fetch'
import { parse } from './effects/parse'

import actionTypes from './action-types'

const selectGraph = createAction(actionTypes.SELECT_GRAPH)

const requestGraph = createAction(actionTypes.REQUEST_GRAPH)
const receiveGraph = createAction(actionTypes.RECEIVE_GRAPH)
const erroredGraph = createAction(actionTypes.ERRORED_GRAPH)

function fetchGraph (id) {
  return [
    requestGraph(id),
    bind(
      fetch(id),
      parseGraph,
      erroredGraph
    )
  ]
}

function parseGraph (data) {
  return bind(
    parse(data),
    receiveGraph,
    erroredGraph
  )
}

module.exports = {
  selectGraph,
  fetchGraph
}
