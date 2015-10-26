import { handleActions } from 'redux-actions'

const {
  SELECT_GRAPH,
  REQUEST_GRAPH,
  RECEIVE_GRAPH,
  ERRORED_GRAPH
} = require('./action-types')

const reducer = handleActions({
  SELECT_GRAPH: (state, action) => {
    return {
      ...state,
      graphId: action.payload
    }
  },
  REQUEST_GRAPH: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    }
  },
  RECEIVE_GRAPH: (state, action) => {
    return {
      ...state,
      graph: action.payload,
      loading: false
    }
  },
  ERRORED_GRAPH: (state, action) => {
    console.error(action.payload)
    return {
      ...state,
      error: action.payload
    }
  }
})

module.exports = reducer
