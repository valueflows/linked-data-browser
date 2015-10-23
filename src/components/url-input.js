import el from 'vdom-element'

function render (props) {
  const { key, value, label, onChange } = props

  return (
    <div class="UrlInput-container">
      <label
        class="UrlInput-label"
        htmlFor={key}
      >{ label }</label>
      <input
        class="UrlInput-input"
        type="url"
        value={value}
        id={key}
        ev-change={ e => onChange(e.target.value) }
      />
    </div>
  )
}

module.exports = { render }
