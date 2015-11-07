import vdux from 'vdux'
import { listen } from 'virtual-component'
import { handleOnce } from 'redux-effects-events'
import { getUrl, setUrl, bindUrl } from 'redux-effects-location'
import el from 'vdom-element'
import QueryString from 'querystring'

import createStore from './store'
import App from './app'
import { getProps } from './getters'
import { receiveRoute, initRoute } from './actions'
import parseRoute from './util/parse-route'

const store = createStore({
  route: {},
  prefixes: {},
  graphs: [],
  quads: [],
  views: {
    nodeList: {
      label: 'node list',
      Component: require('./components/node-list')
    },
    quadsTable: {
      label: 'quads table',
      Component: require('./components/quads-table')
    }
  }
})

store.dispatch(handleOnce('domready', () => {
  listen(store.dispatch)
  setupRouter(store)

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

function setupRouter (store) {
  store.dispatch(initRoute())
  /*store.dispatch(bindUrl((url) => {
    return receiveRoute(parseRoute(url))
  }))*/
  store.subscribe(() => {
    const route = store.getState().route
    const queryString = QueryString.stringify(route)
    const nextUrl = `/?${queryString}`
    store.dispatch(setUrl(nextUrl))
  })
}
