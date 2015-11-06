import React from 'react'
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Modal from 'react-modal'

import Table from '../Table'
import Chart from '../Chart'
import Description from '../Description'

import * as data from '../../data.js'
import * as descData from '../../descriptions.js'

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
      modalDisplay: null,
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

  setModalDisplay (key) {
    console.log('displayModal', key)
    this.setState({modalDisplay: key})
  },

  isFiltered (what) {
    return !!this.state.filters[what]
  },

  getFilteredCount () {
    const ret = data.countUnfiltered(this.state.filters)
    return ret
  },

  render () {
    const modalCountry = this.state.modalDisplay
    return (
      <div className="Container">
        <Modal
          isOpen={!!modalCountry}
          onRequestClose={() => this.setModalDisplay(null)}
        >
          <Description
            country={modalCountry}
            data={descData.getData(modalCountry)}
          />
        </Modal>
        <Table
          data={data.FEATURES}
          columns={data.COLUMNS}
          filterTest={this.isFiltered}
          onFilterClick={this.toggleFilter}
          onInfoClick={this.setModalDisplay}
        />
        <Chart
          total={data.COUNT_TOTAL}
          current={this.getFilteredCount()}
        />
      </div>
    )
  },
})

export default Container
