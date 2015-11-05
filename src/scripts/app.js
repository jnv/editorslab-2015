import ReactDOM from 'react-dom'
import React from 'react'
import Container from './components/Container'

require('../styles/base.css')

const features = [
  {name: 'React JSX Transformer with harmony support', url: 'https://www.npmjs.com/package/react-tools'},
  {name: 'React Hot Loader', url: 'https://github.com/gaearon/react-hot-loader'},
  {name: 'Post CSS with autoprefixer and csswring', url: 'https://github.com/postcss/postcss'},
  {name: 'SASS Support using libsass', url: 'https://www.npmjs.com/package/node-sass'},
  {name: 'Webpack', url: 'http://webpack.github.io/'},
  {name: 'Webpack Dev Server', url: 'http://webpack.github.io/docs/webpack-dev-server.html'},
  {name: 'JQuery', url: 'http://jquery.com/'},
  {name: 'Development and Production configuration and scripts', url: ''},
]

import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

ReactDOM.render(
  <Container features={features} />, document.getElementById('content')
)
