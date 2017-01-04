var config = require('./webpack.config')

var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
    },
  }),
  // keeps hashes consistent between compilations
  new webpack.optimize.OccurenceOrderPlugin(),
  // minifies your code
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
    },
  }),
  new CopyWebpackPlugin([
    {
      from: 'src/images',
      to: 'images',
    },
  ]),
]
Array.prototype.push.apply(config.plugins, plugins)

module.exports = config
