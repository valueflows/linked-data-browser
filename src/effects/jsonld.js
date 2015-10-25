Jsonld = 

export default function (cookieMap) {
  return ({dispatch, getState}) => next => action => {
    if (action.type !== 'COOKIE') {
      return next(action)
    }

    switch (action.verb) {
      case 'set':
        return Promise.resolve(cookie(action.name, action.value))
      case 'get':
        return Promise.resolve(cookie(action.name))
    }
  }

  function cookie (name, value) {
    if (arguments.length === 2) {
      if (cookieMap) cookieMap[name] = value
      else _cookie(name, value)
    }

    return cookieMap ? cookieMap[name] : _cookie(name)
  }
}
