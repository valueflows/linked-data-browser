import el from 'vdom-element'
import { Util as N3Util } from 'n3'
import { map, mapValues } from 'lodash'

export default function render (props) {
  const { subjects, prefixer } = props

  return <div className="NodeList-container">{
    renderSubjects({ subjects, prefixer })
  }</div>
}

function renderSubjects({ subjects, prefixer }) {
  return <ul className="NodeList-list">{
    subjects ? map(subjects, (subject, subjectId) => {
      return renderSubject({ attrs: subject, id: subjectId, prefixer })
    }) : null
  }</ul>
}

function renderSubject({ attrs, id, prefixer }) {
  return <li className="NodeList-item">
    <h3 className="NodeList-id">
      { prefixer(id) }
    </h3>
    <ul className="NodeList-attrs">{
      map(attrs, (values, key) => {
        return <li className="NodeList-key-values">
          <h4 className="NodeList-key">
            { prefixer(key) }
          </h4>
          <ul className="NodeList-values">{
            values.map((value) => {
              return <li className="NodeList-value">
                { prefixer(value) }
              </li>
            })
          }</ul>
        </li>
      })
    }</ul>
  </li>
}
