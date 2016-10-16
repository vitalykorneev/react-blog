const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development']

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'http://localhost:1337' || 'localhost',
  apiPort: process.env.APIPORT,
  loginCookie: 'api_login',
  tokenCookie: 'api_token',
  loginHeader: 'X-User-Email',
  tokenHeader: 'X-User-Token',
  googleAnalyticsId: 'UA-41559965-2',
  app: {
    title: 'Blog',
    description: 'Blog',
    head: {
      titleTemplate: 'Blog: %s',
      meta: [
        {name: 'description', content: 'Blog description'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Blog'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Blog'},
        {property: 'og:description', content: 'Blog description'}
      ]
    }
  }
}, environment)
