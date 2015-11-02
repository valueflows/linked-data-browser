import { createSelector, createStructuredSelector } from 'reselect'
import { Store } from 'n3'
import lod from 'linkeddata-vocabs'
import createPrefixer from './util/prefixer'

const getPrefixes = state => state.prefixes

const getPrefixer = createSelector(
  getPrefixes,
  (prefixes) => {
    return createPrefixer(prefixes)
  }
)

const getQuads = state => state.quads
const getGraphs = state => state.graphs

const getStore = createSelector(
  getQuads,
  getPrefixes,
  (quads, prefixes) => {
    return Store(quads, { prefixes })
  }
)

const getNodeIds = createSelector(
  getStore,
  (store) => {
    return store.find(null, lod.rdf.type, null, null)
      .map((quad) => quad.subject)
  }
)

const getNodes = createSelector(
  getStore,
  getNodeIds,
  (store, nodeIds) => {
    let nodes = {}
    nodeIds.forEach((nodeId) => {
      let node = {}
      store.find(nodeId, null, null, null).forEach((quad) => {
        if (node[quad.predicate] == null) {
          node[quad.predicate] = []
        }
        node[quad.predicate].push(quad.object)
      })
      nodes[nodeId] = node
    })
    return nodes
  }
)

const getRoute = state => state.route

const getFocusId = createSelector(
  getRoute,
  (route) => route.focusId
)

const getFocus  = createSelector(
  getFocusId,
  getNodes,
  (focusId, nodes) => {
    if (nodes[focusId]) {
      return nodes[focusId]
    }
  }
)

export const getProps = createStructuredSelector({
  prefixer: getPrefixer,
  graphs: getGraphs,
  quads: getQuads,
  store: getStore,
  nodeIds: getNodeIds,
  nodes: getNodes,
  focusId: getFocusId,
  focus: getFocus,
  route: getRoute
})
