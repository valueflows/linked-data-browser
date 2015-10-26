import { handleActions } from 'redux-actions'

const {
  SELECT_FOCUS,
  REQUEST_GRAPH,
  RECEIVE_GRAPH,
  SET_ERROR
} = require('./action-types')

const reducer = handleActions({
  SELECT_FOCUS: (state, action) => {
    return {
      ...state,
      focusId: action.payload
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
      quads: state.quads.concat(action.payload.quads),
      prefixes: Object.assign({}, state.prefixes, action.payload.prefixes),
      loading: false
    }
  },
  SET_ERROR: (state, action) => {
    console.error(action.payload)
    return {
      ...state,
      error: action.payload
    }
  }
})

module.exports = reducer
