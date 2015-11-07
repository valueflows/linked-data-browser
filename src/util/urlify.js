module.exports = createUrlify

function createUrlify (url) {
  return (obj) => {
    return { ...obj, url }
  }
}
