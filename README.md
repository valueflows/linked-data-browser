# linked-data-browser

browse through linked data graphs

## install

```
git clone https://github.com/ahdinosaur/linked-data-browser
cd linked-data-browser
npm install
```

## scripts

- [install](#install)
- [start](#start)
- [test](#test)
- [lint](#lint)
- [format](#format)
- [deploy](#deploy)

### install

```bash
npm install
```

### start

starts development environment

```bash
npm start
```

browse to <http://localhost:9966/>.

### test

run tests

```bash
npm test
```

### lint

checks for [standard style](http://standardjs.com)

can optionally take a [glob](https://www.npmjs.com/package/glob)

```bash
npm run lint -- './app/**/*.js'
```

### format

converts to [standard](http://standardjs.com) if possible

can optionally take a [glob](https://www.npmjs.com/package/glob)

```bash
npm run format -- './app/**/*.js'
```

## deploy

```
npm run deploy
```
