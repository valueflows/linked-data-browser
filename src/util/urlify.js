export default function createUrlify (url) {
  return (obj) => {
    return { ...obj, url }
  }
}
