import vdux from 'vdux'
import { listen } from 'virtual-component'
import { handleOnce } from 'redux-effects-events'
import el from 'vdom-element'

import createStore from './store'
import App from './app'
import { getProps } from './getters'

const store = createStore({
  focusId: 'https://rawgit.com/valueflows/agent/master/examples/enspiral.jsonld',
  quads: [],
  prefixes: {},
  /*
  view: 'quads-table',
  views: views
  */
})

store.dispatch(handleOnce('domready', () => {
  listen(store.dispatch)

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
