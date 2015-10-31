import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import effects from 'redux-effects'
import events from 'redux-effects-events'
import location from 'redux-effects-location'
import fetch from './effects/fetch'
import parse from './effects/parse'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

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
