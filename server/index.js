'use strict'

const compression = require('compression')
const config = require('../config')
const Express = require('express')
const fs = require('fs')
const http = require('http')
const path = require('path')

// const noCache = require('./noCache')
const errors = require('./errors')
const logger = require('./log')

const app = new Express()
const server = new http.Server(app)

const isProd = process.env.NODE_ENV === 'production'

logger(app, process.env.NODE_ENV)

app.use(compression())

// WebPack middleware
if (!isProd) {
  const webpack = require('webpack')
  const webpackConfig = require('../webpack/dev.config')
  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath
  }))
  app.use(require('webpack-hot-middleware')(compiler))
} else {
  app.use(Express.static(path.join(__dirname, '..', 'public')))
}

const manifestPath = path.resolve(__dirname, '../public/build/manifest.json')
let manifestFile = ''

try {
  manifestFile = fs.statSync(manifestPath) && JSON.parse(fs.readFileSync(manifestPath).toString())
} catch (err) {
  if (err.code === 'ENOENT') console.info('==> ☠  Manifest file does not exists!')
}

const getManifestItem = (key) => manifestFile && manifestFile[key]
const bundleJsFile = isProd ? path.join('build', getManifestItem('main.js') ? getManifestItem('main.js') : '') : 'main.js'
const bundleCssFile = isProd ? path.join('build', getManifestItem('main.css') ? getManifestItem('main.css') : '') : ''

const HTML = `
  <!doctype html>
  <html lang="en">
    <head>
      <title>Blog</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>body { margin: 0; padding: 0; min-height: 100%; font-family: system, -apple-system, Helvetica, Arial, sans-serif; background: #fff; }</style>
      <link rel="manifest" href="/favicons/dest/manifest.json?v=gAA7bEArbx">
      <link rel="mask-icon" href="/favicons/dest/safari-pinned-tab.svg?v=gAA7bEArbx" color="#fae263">
      <link rel="shortcut icon" href="/favicons/dest/favicon.ico?v=gAA7bEArbx">
      <meta name="apple-mobile-web-app-title" content="Blog">
      <meta name="application-name" content="Blog">
      <meta name="msapplication-TileColor" content="#da532c">
      <meta name="msapplication-TileImage" content="/mstile-144x144.png?v=gAA7bEArbx">
      <meta name="theme-color" content="#fae263">
      ${bundleCssFile ? `<link rel="stylesheet" media="all" href="/${bundleCssFile}"></link>` : ''}
    </head>
    <body>
      <div id="app"></div>
      <script type="application/javascript" src="/${bundleJsFile}"></script>
    </body>
  </html>
`

// Serve index html
app.use((req, res) => res.end(HTML))
app.use(errors)

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err)
    }
    console.info('----\n==> 🚀  %s is running, talking to API server on %s.', config.app.title, config.apiHost)
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port)
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified')
}
