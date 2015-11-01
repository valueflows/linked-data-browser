import QueryString from 'querystring'

export default function parseRoute (url) {
  const queryString = url.split('?', 2)[1]
  return QueryString.parse(queryString)
}
