import el from 'vdom-element'
import { map } from 'lodash'

function render (props) {
  const { views, viewId, onSelect } = props

  return (
    <div className="View-container">
      <label
        className="View-label"
        htmlFor="view"
      >{ "view as:" }</label>
      <select
        className="View-select"
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
