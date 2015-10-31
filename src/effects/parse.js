import { createAction } from 'redux-actions'
import { Util as N3Util, Parser as N3Parser, Store as N3Store } from 'n3'
import { promises as JsonLd } from 'jsonld'

import createUrlify from '../util/urlify'

const PARSE = 'EFFECT_PARSE'

function parseMiddleware ({ dispatch, getState }) {
  return next => action => {
    const urlify = createUrlify(action.payload.url)

    return action.type === PARSE
      ? parserByFormat(action.payload.type)(action.payload.content)
        .then(urlify)
        .catch((error ) => {
          return urlify({ error })
        })
      : next(action)
  }
}

function parserByFormat (format) {
  switch (format) {
    case 'application/octet':
    case 'application/json':
    case 'application/ld+json':
      return (content) => {
        let json = JSON.parse(content)
        var context
        return processContext(json['@context'])
        .then((ctx) => {
          json['@context'] = context = ctx
          return JsonLd.toRDF(json, { format: 'application/nquads' })
        })
        .then(parserByFormat('application/n-quads'))
        .then((graph) => {
          return {
            content: content,
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
      return (content) => {
        return new Promise((resolve, reject) => {
          var quads = []
          parser.parse(content, (err, quad, prefixes) => {
            if (err) { return reject(err) }
            if (quad) {
              quads.push(quad)
            } else {
              resolve({ content, quads, prefixes })
            }
          })
        })
      }

    default:
      return content => {
        return { content, quads: [], prefixes: {} }
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
