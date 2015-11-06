import React from 'react'
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Colors from 'material-ui/lib/styles/colors'

const Container = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    }
  },

  getInitialState () {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      filters: {},
    }
  },

  render () {
    return (
      <div className="Container">
        <h1>
          Congratulations, you now have a working react.js application.
        </h1>
        Features include:
      </div>
    )
  },
})

export default Container
