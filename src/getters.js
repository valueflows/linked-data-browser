const { createSelector, createStructuredSelector } = require('reselect')
const { Store } = require('n3')
const lod = require('linkeddata-vocabs')
const createPrefixer = require('./util/prefixer')
const map = require('lodash.map')
const uniq = require('lodash.uniq')
const flatten = require('lodash.flatten')

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
    return mapToObject(nodeIds, (nodeId) => {
      let node = {}
      store.find(nodeId, null, null, null).forEach((quad) => {
        if (node[quad.predicate] == null) {
          node[quad.predicate] = []
        }
        node[quad.predicate].push(quad.object)
      })
      return node
    })
    return nodes
  }
)

const getSubProperties = createRelation(
  findIncoming, lod.rdfs.subPropertyOf
)

const getSuperProperties = createRelation(
  findOutgoing, lod.rdfs.subPropertyOf
)

const getSubClasses = createRelation(
  findIncoming, lod.rdfs.subClassOf
)

const getSuperClasses = createRelation(
  findOutgoing, lod.rdfs.subClassOf
)

const getRoute = state => state.route

const getFocusId = createSelector(
  getRoute,
  (route) => route.focusId
)

const getFocus = createSelector(
  getFocusId,
  getNodes,
  (focusId, nodes) => {
    if (nodes[focusId]) {
      return nodes[focusId]
    }
  }
)

const getViews = state => state.views

const getViewId = createSelector(
  getRoute, (route) => route.viewId
)
const getView = createSelector(
  getViews, getViewId,
  (views, viewId) => views[viewId]
)


const getProps = createStructuredSelector({
  prefixer: getPrefixer,
  graphs: getGraphs,
  quads: getQuads,
  store: getStore,
  nodeIds: getNodeIds,
  nodes: getNodes,
  superProperties: getSuperProperties,
  subProperties: getSubProperties,
  superClasses: getSuperClasses,
  subClasses: getSubClasses,
  focusId: getFocusId,
  focus: getFocus,
  route: getRoute,
  views: getViews,
  viewId: getViewId,
  view: getView
})

module.exports = {
  getProps
}

function createRelation (findFn, ...args) {
  return createSelector(
    getStore,
    getNodeIds,
    (store, nodeIds) => {
      return mapToObject(nodeIds, function (nodeId) {
        return collect(store, nodeId, findFn, ...args)
      })
    }
  )
}


function collect (store, node, findFn, ...args) {
  return collectStep(store, node, [], findFn, ...args)
}

function collectStep (store, node, sofar, findFn, ...args) {
  const nextNodes = findFn(store, node, ...args)
    .filter((node) => {
      return sofar.indexOf(node) === -1
    })

  if (nextNodes.length === 0) {
    return []
  }

  return nextNodes.concat(
    uniq(flatten(
      nextNodes.map((nextNode) => {
        return collectStep(store, nextNode, sofar, findFn, ...args)
      })
    ))
  )
}

function findOutgoingQuads (store, node, predicate) {
  return store.find(node, predicate, null, null)
}
function findOutgoing (store, node, predicate) {
  return findOutgoingQuads(store, node, predicate)
    .map((quad) => quad.object)
}

function findIncomingQuads (store, node, predicate) {
  return store.find(null, predicate, node, null)
}
function findIncoming (store, node, predicate) {
  return findIncomingQuads(store, node, predicate)
    .map((quad) => quad.subject)
}

function findQuadsBetween (store, node, nodeA, nodeB) {
  return store.find(nodeA, null, nodeB, null)
}

function findBetween (store, node, nodeA, nodeB) {
  return findQuadsBetween(store, node, nodeA, nodeB)
    .map((quad) => quad.predicate)
}

// TODO: util-ify
function mapToObject (array, fn) {
  var obj = {}
  array.forEach(function (item) {
    obj[item] = fn(item)
  })
  return obj
}
