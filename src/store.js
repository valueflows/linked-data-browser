const { createStore, applyMiddleware } = require('redux')
const reducer = require('./reducer')
const effects = require('redux-effects').default
const events = require('redux-effects-events').default
const location = require('redux-effects-location').default
const fetch = require('./effects/fetch')
const parse = require('./effects/parse')
const multi = require('redux-multi')
const thunk = require('redux-thunk')
const logger = require('redux-logger')

module.exports = configureStore

const middleware = [
  multi,
  thunk,
  effects,
  location(window),
  events(),
  fetch,
  parse,
  logger()
]

function configureStore (initialState) {
  return applyMiddleware(...middleware)(createStore)(reducer, initialState)
}
