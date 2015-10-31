import { createAction } from 'redux-actions'
import { bind } from 'redux-effects'
import { fetch } from './effects/fetch'
import { parse } from './effects/parse'

import actionTypes from './action-types'

const selectFocus = createAction(actionTypes.SELECT_FOCUS)

const requestGraph = createAction(actionTypes.REQUEST_GRAPH)
const receiveGraph = createAction(actionTypes.RECEIVE_GRAPH)
const erroredGraph = createAction(actionTypes.ERRORED_GRAPH)
const receivePrefixes = createAction(actionTypes.RECEIVE_PREFIXES)
const receiveQuads = createAction(actionTypes.RECEIVE_QUADS)
const setError = createAction(actionTypes.SET_ERROR)

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

function shouldFetchGraph (state, graphId) {
  const graph = state.graphs[graphId]
  if (!graph) return true
  if (graph.content === undefined) return false
  return !!graph.dirty
}

function loadGraph (id) {
  return (dispatch, getState) => {
    if (shouldFetchGraph(getState()), id) {
      return dispatch(fetchGraph(id))
    }
  }
}

function parseGraph (graph) {
  return [
    receiveGraph(graph),
    bind(
      parse(graph),
      (graph) => {
        const { prefixes, quads } = graph
        return [
          receiveGraph(graph),
          receivePrefixes(prefixes),
          receiveQuads(quads)
        ]
      },
      erroredGraph
    )
  ]
}

module.exports = {
  selectFocus,
  loadGraph
}
