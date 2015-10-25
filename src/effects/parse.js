import { createAction } from 'redux-actions'
const rdf = require('rdf-ext')()

const PARSE = 'EFFECT_PARSE'

function parseMiddleware ({ dispatch, getState }) {
  return next => action =>
    action.type === PARSE
      ? rdf.utils.parse(action.payload.type, action.payload.text)
      : next(action)
}

const parse = createAction(PARSE)
 
export default parseMiddleware
export { parse }
