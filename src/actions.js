const { createAction } = require('redux-actions')
const Url = require('url')
const QueryString = require('querystring')
const { bind } = require('redux-effects')
const { getUrl, setUrl, bindUrl } = require('redux-effects-location')

const { fetch } = require('./effects/fetch')
const { parse } = require('./effects/parse')
const actionTypes = require('./action-types')
const parseRoute = require('./util/parse-route')

const receiveRoute = createAction(actionTypes.RECEIVE_ROUTE)

function selectRoute (route) {
  return (dispatch, getState) => {
    const currentRoute = getState().route
    const nextRoute = { ...currentRoute, ...route }
    const queryString = QueryString.stringify(nextRoute)
    return dispatch(setUrl(`/?${queryString}`))
  }
}

function initRoute () {
  return bind(
    getUrl(),
    (url) => {
      const route = Object.assign({
        viewId: 'nodeList',
        focusId: 'https://rawgit.com/valueflows/agent/master/examples/enspiral.jsonld'
      }, parseRoute(url))
      return receiveRoute(route)
    },
    setError
  )
}

function bindRoute () {
  return bindUrl((url) => {
    const route = parseRoute(url)
    return receiveRoute(route)
  })
}

function setupRouter () {
  return [initRoute(), bindRoute()]
}

function selectFocus (focusId) {
  return selectRoute({ focusId })
}

function selectView (viewId) {
  return selectRoute({ viewId })
}

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
      (graph) => {
        let action = []
        if (graph.url !== id) {
          // graph was a redirect
          action.push(redirectGraph(id, graph.url))
        }
        action.push(parseGraph(graph))
        return action
      },
      erroredGraph
    )
  ]
}

function redirectGraph (oldUrl, newUrl) {
  return receiveGraph({
    url: oldUrl, redirect: newUrl
  })
}

function shouldFetchGraph (state, graphId) {
  const graph = state.graphs[graphId]
  if (!graph) return true
  if (graph.content === undefined) return false
  return !!graph.dirty
}

function loadGraph (id) {
  if (id) id = unhashUrl(id)
  return (dispatch, getState) => {
    if (shouldFetchGraph(getState(), id)) {
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
  setupRouter,
  receiveRoute,
  selectRoute,
  selectFocus,
  selectView,
  loadGraph
}

// TODO util-ify
function unhashUrl (url) {
  return Url.format(
    Object.assign(
      Url.parse(url), { hash: null }
    )
  )
}
