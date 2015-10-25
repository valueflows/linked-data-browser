import isofetch from 'isomorphic-fetch'
import readBlob from 'read-blob'
import { createAction } from 'redux-actions'

const FETCH = 'EFFECT_FETCH'

function fetchMiddleware ({ dispatch, getState }) {
  return next => action =>
    action.type === FETCH
      ? isofetch(action.payload.url, action.payload.params)
        .then(checkStatus)
        .then(blobify)
        .then(textify)
      : next(action)
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
        text: text
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
