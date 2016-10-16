// module.exports = require("./makewebpackconfig")({
//   prod: false
// });

// Webpack config for development
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, '..'),
  devtool: 'cheap-eval-source-map',
  entry: {
    'main': [
      'webpack-hot-middleware/client',
      './src/app.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: './build/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.svg$/, loader: 'babel!svg-react' },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss?outputStyle=expanded&sourceMap' }
    ]
  },
  postcss: function() { return require('./postcss/plugins.js'); },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin()
  ],
  target: 'web', // Make web variables accessible to webpack, e.g. window
  stats: true, // Don't show stats in the console
  progress: true
};
