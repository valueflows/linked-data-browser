import el from 'vdom-element'

function render (props) {
  const { focusId, label, onChange } = props

  return (
    <div class="Focus-container">
      <label
        class="Focus-label"
        htmlFor={focusId}
      >{ "focus @id" }</label>
      <input
        class="Focus-select"
        type="url"
        value={focusId}
        key={focusId}
        ev-change={ e => onSelect(e.target.value) }
      />
    </div>
  )
}

module.exports = { render }
