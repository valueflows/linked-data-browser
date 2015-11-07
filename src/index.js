const vdux = require('vdux')
const { listen } = require('virtual-component')
const { handleOnce } = require('redux-effects-events')
const { getUrl, setUrl, bindUrl } = require('redux-effects-location')
const el = require('vdom-element')
const QueryString = require('querystring')

const createStore = require('./store')
const App = require('./app')
const { getProps } = require('./getters')
const { receiveRoute, initRoute } = require('./actions')
const parseRoute = require('./util/parse-route')

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
