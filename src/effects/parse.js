import { createAction } from 'redux-actions'
import { Util as N3Util, Parser as N3Parser, Store as N3Store } from 'n3'
import { promises as JsonLd } from 'jsonld'

const PARSE = 'EFFECT_PARSE'

function parseMiddleware ({ dispatch, getState }) {
  return next => action =>
    action.type === PARSE
      ? parserByFormat(action.payload.type)(action.payload.text)
      : next(action)
}

function parserByFormat (format) {
  switch (format) {
    case 'application/octet':
    case 'application/json':
    case 'application/ld+json':
      return (text) => {
        let json = JSON.parse(text)
        var context
        return processContext(json['@context'])
        .then((ctx) => {
          json['@context'] = context = ctx
          return JsonLd.toRDF(json, { format: 'application/nquads' })
        })
        .then(parserByFormat('application/n-quads'))
        .then((graph) => {
          return {
            quads: graph.quads,
            prefixes: context
          }
        })
      }

    case 'application/trig':
    case 'text/turtle':
    case 'application/n-triples':
    case 'application/n-quads':
      var parser = N3Parser({ format })
      return (text) => {
        return new Promise((resolve, reject) => {
          var quads = []
          parser.parse(text, (err, quad, prefixes) => {
            if (err) { return reject(err) }
            if (quad) {
              quads.push(quad)
            } else {
              resolve({ quads, prefixes })
            }
          })
        })
      }

    default:
      return text => {
        return { quads: [], prefixes: {} }
      }
  }
}

function processContext (contexts) {
  // normalize input
  if (!Array.isArray(contexts)) {
    contexts = [contexts]
  }
  // fetch remote contexts if necessary
  return Promise.all(contexts.map((context) => {
    if (typeof context === 'string') {
      return fetch(context)
        .then(res => res.json())
        .then(json => json['@context'])
    }
    return context
  }))
  .then((contexts) => {
    // recursively process contexts
    return Promise.all(contexts.map((context) => {
      if (
        typeof context === 'string' ||
        Array.isArray(context)
      ) return processContext(context)
      else return context
    }))
  })
  .then((contexts) => {
    var merged = {}
    contexts.forEach(function (context) {
      Object.assign(merged, context)
    })
    return merged
  })
}

const parse = createAction(PARSE)
 
export default parseMiddleware
export { parse }
