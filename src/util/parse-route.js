const QueryString = require('querystring')

module.exports = parseRoute

function parseRoute (url) {
  const queryString = url.split('?', 2)[1]
  return QueryString.parse(queryString)
}
