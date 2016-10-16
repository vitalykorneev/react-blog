var path = require('path')
var webpack = require('webpack')
var CleanPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var ManifestPlugin = require('webpack-manifest-plugin')

module.exports = function(options) {
  var rootPath = path.resolve(__dirname , '..')
  var devtool, entry, cssLoader, plugins, stats
  var output = {}

  // PRODUCTION MODE
  if (options.prod) {
    devtool = 'cheap-module-source-map'
    entry = [
      './src/app.js' // Start with js/app.js...
    ]
    output = {
      path: 'public/build',
      filename: '[name].[hash].js'
    }
    cssLoader = ExtractTextPlugin.extract('style-loader', 'css?modules&importLoaders=1&localIdentName=[hash:base64:5]!postcss?outputStyle=expanded&sourceMap')
    plugins = [
      new CleanPlugin('public/build', {
        root: rootPath
      }),
      new ExtractTextPlugin('[name].[hash].css'),
      new ManifestPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          // Useful to reduce the size of client-side libraries, e.g. react
          NODE_ENV: JSON.stringify('production')
        }
      }),
      // Optimizations
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ // Optimize the JavaScript...
        compress: {
          warnings: false, // ...but do not show warnings in the console (there is a lot of them)
          drop_console: true // discard calls to console.* functions in bundle file
        }
      })
    ]

  // DEVELOPMENT MODE
  } else {
    devtool = 'cheap-eval-source-map'
    entry = [
      'webpack-hot-middleware/client',
      './src/app.js'
    ]
    output = {
      path: '/',
      filename: 'main.js'
    }
    cssLoader = 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:3]!postcss?outputStyle=expanded&sourceMap'
    plugins = [
      new webpack.HotModuleReplacementPlugin() // Make hot loading work
    ]
  }

  return {
    context: rootPath,
    devtool: devtool,
    entry: entry,
    output: output,
    module: {
      loaders: [{
          test: /\.jsx?$/, // Transform all .js files required somewhere within an entry point...
          loader: 'babel', // ...with the specified loaders...
          exclude: /node_modules/ // ...except for the node_modules folder.
        }, {
          test: /\.css$/, // Transform all .css files required somewhere within an entry point...
          loader: cssLoader // ...with PostCSS
        }, {
          test: /\.jpe?g$|\.gif$|\.png$/i,
          loader: "url-loader?limit=10000"
        }
      ]
    },
    resolve: {
      modulesDirectories: [
        'src',
        'node_modules'
      ],
      extensions: ['', '.json', '.js', '.jsx', '.css']
    },
    postcss: function() { return require('./postcss/plugins.js'); },
    plugins: plugins,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    stats: {
      colors: true,
      hash: false,
      version: false,
      chunks: false,
      children: false
    },
    progress: true
  }
}
