import el from 'vdom-element'
const sheetify = require('sheetify')
import { map } from 'lodash'

const prefix = sheetify('./view-selector.css')

function render (props) {
  const { views, viewId, onSelect } = props

  return (
    <div className={ prefix }>
      <label
        className="label"
        htmlFor="view"
      >{ "view as:" }</label>
      <select
        className="select"
        id="view"
        name="view"
        ev-change={ e => onSelect(e.target.value) }
      >{
        map(views, (viewOption, viewOptionId) =>
          <option
            value={viewOptionId}
            selected={viewId === viewOptionId}
          >{ viewOption.label }</option>
        )
      }</select>
    </div>
  )
}

module.exports = { render }
