import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import effects from 'redux-effects'
import events from 'redux-effects-events'
import fetch from 'redux-effects-fetch'
import multi from 'redux-multi'
import logger from 'redux-logger'

module.exports = configureStore

const middleware = [
  multi,
  effects,
  events(),
  fetch,
  logger()
]

function configureStore (initialState) {
  return applyMiddleware(...middleware)(createStore)(reducer, initialState)
}
