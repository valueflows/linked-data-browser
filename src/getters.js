import { createSelector, createStructuredSelector } from 'reselect'
import Reasoner, { Graph } from 'reasoner'
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

export const getGraph = createSelector(
  getQuads,
  (quads) => {
    let graph = new Graph()
    quads.forEach(graph.add.bind(graph))
    return graph
  }
)

export const getSubjectIds = createSelector(
  getGraph,
  (graph) => {
    var subjectIds = []
    for (let quad of graph.find({ predicate: lod.rdf.type })) {
      subjectIds.push(quad.subject)
    }
    return subjectIds
  }
)

export const getSubjectIdsByType = createSelector(
  getGraph,
  (graph) => {
    var subjectIdsByType = {}
    for (let quad of graph.find({ predicate: lod.rdf.type })) {
      if (subjectIdsByType[quad.object] == null) {
        subjectIdsByType[quad.object] = []
      }
      subjectIdsByType[quad.object].push(quad.subject)
    }
    return subjectIdsByType
  }
)

export const getSubjects = createSelector(
  getGraph,
  getSubjectIds,
  (graph, subjectIds) => {
    let subjects = {}
    subjectIds.forEach((subjectId) => {
      let subject = {}
      for (let quad of graph.find({ subject: subjectId })) {
        if (subject[quad.predicate] == null) {
          subject[quad.predicate] = []
        }
        subject[quad.predicate].push(quad.object)
      }
      subjects[subjectId] = subject
    })
    return subjects
  }
)

export const getReasoner = createSelector(
  getGraph,
  (graph) => {
    return new Reasoner(graph)
  }
)

const getFocusId = state => state.focusId

export const getFocus = createSelector(
  getReasoner,
  getFocusId,
  (reasoner, focusId) => {
    return reasoner.node(focusId)
  }
)

export const getProps = createStructuredSelector({
  prefixer: getPrefixer,
  quads: getQuads,
  graph: getGraph,
  subjectIds: getSubjectIds,
  subjectIdsByType: getSubjectIdsByType,
  subjects: getSubjects,
  reasoner: getReasoner,
  focusId: getFocusId,
  focus: getFocus
})
