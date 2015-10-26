import { createSelector } from 'reselect'
import { Store } from 'n3'

const getTriples = state => state.triples
const getPrefixes = state => state.prefixes

export const getStore = createSelector(
  getTriples,
  getPrefixes,
  (triples, prefixes) => {
    return Store(triples, { prefixes })
  }
)
