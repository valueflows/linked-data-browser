import el from 'vdom-element'
const sheetify = require('sheetify')

const prefix = sheetify('./focus-selector.css')

function render (props) {
  const { focusId, label, onSelect } = props

  return (
    <div className={prefix}>
      <label
        className="label"
        htmlFor={focusId}
      >{ "focus @id" }</label>
      <input
        className="select"
        type="url"
        value={focusId}
        key={focusId}
        ev-change={ e => onSelect(e.target.value) }
      />
    </div>
  )
}

module.exports = { render }
