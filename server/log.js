const fs = require('fs')
const logger = require('morgan')

module.exports = function(app, env) {
  if (env === 'production') {
    const logStream = fs.createWriteStream(
      '/var/log/blog/production.log',
      { flags: 'a' }
    )
    app.use(logger('combined', { stream: logStream }))
  } else {
    app.use(logger('dev'))
  }
}
