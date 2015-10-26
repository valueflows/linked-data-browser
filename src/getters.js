import { createSelector, createStructuredSelector } from 'reselect'
import Reasoner, { Graph } from 'reasoner'

const getPrefixes = state => state.prefixes
const getQuads = state => state.quads
const getFocusId = state => state.focusId

export const getGraph = createSelector(
  getQuads,
  (quads) => {
    let graph = new Graph()
    quads.forEach(graph.add.bind(graph))
    return graph
  }
)

export const getReasoner = createSelector(
  getGraph,
  (graph) => {
    return new Reasoner(graph)
  }
)

export const getFocus = createSelector(
  getReasoner,
  getFocusId,
  (reasoner, focusId) => {
    return reasoner.node(focusId)
  }
)

export const getProps = createStructuredSelector({
  quads: getQuads,
  prefixes: getPrefixes,
  reasoner: getReasoner,
  focusId: getFocusId,
  focus: getFocus
})
