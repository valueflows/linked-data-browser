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
    return store.find(null, lod.rdf.type)
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
      store.find(nodeId).forEach((quad) => {
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

const getFocusId = state => state.focusId

export const getProps = createStructuredSelector({
  prefixer: getPrefixer,
  quads: getQuads,
  store: getStore,
  nodeIds: getNodeIds,
  nodes: getNodes,
  focusId: getFocusId
})
