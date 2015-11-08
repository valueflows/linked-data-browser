const vdux = require('vdux')
const { listen } = require('virtual-component')
const { bind } = require('redux-effects')
const { handleOnce } = require('redux-effects-events')
const { getUrl, setUrl, bindUrl } = require('redux-effects-location')
const el = require('vdom-element')
const QueryString = require('querystring')

const createStore = require('./store')
const App = require('./app')
const { getProps } = require('./getters')
const { receiveRoute, setupRouter } = require('./actions')
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
  store.dispatch(setupRouter())

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
