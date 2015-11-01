import vdux from 'vdux'
import { listen } from 'virtual-component'
import { handleOnce } from 'redux-effects-events'
import { getUrl, bindUrl } from 'redux-effects-location'
import el from 'vdom-element'

import createStore from './store'
import App from './app'
import { getProps } from './getters'
import { setupRouter, receiveRoute } from './actions'

const store = createStore({
  route: {},
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
