import vdux from 'vdux'
import { listen } from 'virtual-component'
import { handleOnce } from 'redux-effects-events'
import { bindUrl } from 'redux-effects-location'
import QueryString from 'querystring'
import el from 'vdom-element'

import createStore from './store'
import App from './app'
import { getProps } from './getters'
import { receiveRoute } from './actions'

const store = createStore({
  route: Object.assign({
    focusId: 'https://rawgit.com/valueflows/agent/master/examples/enspiral.jsonld'
  }, parseRoute(window.location.pathname + window.location.search)),
  prefixes: {},
  graphs: [],
  quads: [],
  /*
  view: 'quads-table',
  views: views
  */
})

store.dispatch(handleOnce('domready', () => {
  listen(store.dispatch)

  bindUrl((url) => {
    return receiveRoute(parseRoute(url))
  })

  vdux(
    store,
    (state) => {
      const props = getProps(state) 
      console.log("props", props)
      return <App { ...props } />
    },
    document.body
  )
}))

// util-ify
function parseRoute (url) {
  const queryString = url.split('?', 2)[1]
  return QueryString.parse(queryString)
}
