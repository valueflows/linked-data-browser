import isofetch from 'isomorphic-fetch'
import readBlob from 'read-blob'
import { createAction } from 'redux-actions'

import createUrlify from '../util/urlify'

const FETCH = 'EFFECT_FETCH'

function fetchMiddleware ({ dispatch, getState }) {
  return next => action => {
    const urlify = createUrlify(action.payload.url)

    return action.type === FETCH
      ? isofetch(action.payload.url, action.payload.params)
        .then(checkStatus)
        .then(blobify)
        .then(textify)
        .then(urlify)
        .catch((error) => {
          throw urlify({ error })
        })
      : next(action)
    }
}

function checkStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    throw res
  }
}

function blobify (res) {
  return res.blob()
}

function textify (blob) {
  return readBlob(blob, 'text')
    .then(text => {
      return {
        type: blob.type,
        content: text
      }
    })
}

const fetch = createAction(
  FETCH,
  (url = '', params = {}) => {
    return { url, params }
  }
)

export default fetchMiddleware
export { fetch }
