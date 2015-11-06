var HtmlWebpackPlugin = require('html-webpack-plugin')
var autoprefixer = require('autoprefixer')
var csswring = require('csswring')
var path = require('path')
var simpleVars = require('postcss-simple-vars')

var config = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss',
    }, {
      test: /\.json$/,
      loader: 'json',
    }, {
      test: /\.woff$|\.ttf$|\.wav$|\.mp3$/,
      loader: 'file',
    }, {
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
      loaders: [
        'url?limit=8192&hash=sha512&digest=hex&name=[hash].[ext]',
        'image?bypassOnDebug&optimizationLevel=7&interlaced=false',
      ],
    }],
  },
  resolve: {
    extensions: ['', '.jsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template_index.html',
      inject: 'body', // Inject all scripts into the body
    }),
  ],
  postcss: [
    simpleVars({
      variables: require('material-ui/lib/styles/colors'),
    }),
    autoprefixer,
    csswring,
  ],
  // devtool: 'eval',
  devtool: 'sourcemap',
  devServer: {
    hot: true,
    inline: true,
    lazy: false,
  },
}

module.exports = config
