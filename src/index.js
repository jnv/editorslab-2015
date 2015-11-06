import ReactDOM from 'react-dom'
import React from 'react'
import Container from './components/Container'

require('./index.css')

import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

ReactDOM.render(
  <Container />, document.getElementById('content')
)
