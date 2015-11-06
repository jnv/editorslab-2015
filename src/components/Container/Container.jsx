import React from 'react'
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Colors from 'material-ui/lib/styles/colors'

import Table from '../Table'

import * as data from '../../data.js'

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

  toggleFilter (filter) {
    const opposite = !this.state.filters[filter]
    const filters = {
      ...this.state.filters,
      [filter]: opposite,
    }
    this.setState({filters: filters})
  },

  isFiltered (what) {
    return !!this.state.filters[what]
  },

  render () {
    console.log(data.countUnfiltered(this.state.filters))
    return (
      <div className="Container">
        <Table
          data={data.FEATURES}
          columns={data.COLUMNS}
          filterTest={this.isFiltered}
          onFilterClick={this.toggleFilter}
        />
      </div>
    )
  },
})

export default Container
