import { createSelector, createStructuredSelector } from 'reselect'
import { Store } from 'n3'
import lod from 'linkeddata-vocabs'
import createPrefixer from './util/prefixer'

export const getPrefixes = state => state.prefixes

export const getPrefixer = createSelector(
  getPrefixes,
  (prefixes) => {
    return createPrefixer(prefixes)
  }
)

export const getQuads = state => state.quads
export const getGraphs = state => state.graphs

export const getStore = createSelector(
  getQuads,
  getPrefixes,
  (quads, prefixes) => {
    return Store(quads, { prefixes })
  }
)

export const getNodeIds = createSelector(
  getStore,
  (store) => {
    return store.find(null, lod.rdf.type, null, null)
      .map((quad) => quad.subject)
  }
)

export const getNodes = createSelector(
  getStore,
  getNodeIds,
  (store, nodeIds) => {
    console.log(store._graphs)
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

export const getProps = createStructuredSelector({
  prefixer: getPrefixer,
  graphs: getGraphs,
  quads: getQuads,
  store: getStore,
  nodeIds: getNodeIds,
  nodes: getNodes,
  route: getRoute
})
