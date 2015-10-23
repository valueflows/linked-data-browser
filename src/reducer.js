import { handleActions } from 'redux-actions'

const {
  SELECT_RESOURCE,
  REQUEST_RESOURCE,
  RECEIVE_RESOURCE,
  ERRORED_RESOURCE
} = require('./action-types')

const reducer = handleActions({
  SELECT_RESOURCE: (state, action) => {
    return {
      ...state,
      resourceId: action.payload
    }
  },
  REQUEST_RESOURCE: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null
    }
  },
  RECEIVE_RESOURCE: (state, action) => {
    return {
      ...state,
      resource: action.payload,
      loading: false
    }
  },
  ERRORED_RESOURCE: (state, action) => {
    return {
      ...state,
      error: action.payload
    }
  }
})

module.exports = reducer
