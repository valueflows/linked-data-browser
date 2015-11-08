/** @jsx el */
const el = require('vdom-element')
const vdux = require('vdux')
const { listen } = require('virtual-component')
const { handleOnce } = require('redux-effects-events')

const createStore = require('./store')
const App = require('./app')
const { getProps } = require('./getters')
const { setupRouter } = require('./actions')

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
      console.log('props', props)
      return <App { ...props } />
    },
    document.body
  )
}))
