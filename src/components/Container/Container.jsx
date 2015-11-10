import React from 'react'
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Modal from 'react-modal'

import {fromPairs} from 'ramda'

import Table from '../Table'
import Chart from '../Chart'
import Description from '../Description'
import Intro from './Intro'

import * as data from '../../data.js'
import * as descData from '../../descriptions.js'

const modalStyle = {
  content: {
    border: 'none',
    background: 'none',
    borderRadius: '0',
    outline: 'none',
    padding: '0',
    maxWidth: '30em',
    overflow: 'visible',
  },
}

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

  setFilters (filters) {
    const pairs = filters.map(key => [key, true])
    const newState = fromPairs(pairs)
    this.setState({filters: newState})
  },

  setModalDisplay (key) {
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
        <h1>Turn-off the Migration</h1>
        <p>
          Migration is a complex problem influenced by many specific factors. By turning off some of the factors, you can try to reduce the number of migrants coming to European Union. Your main goal is to identify the main factors and <b>reduce the migration rate by half</b>.
        </p>
        <Intro onFilterClick={this.setFilters} />
        <Modal
          isOpen={!!modalCountry}
          onRequestClose={() => this.setModalDisplay(null)}
          style={modalStyle}
        >
          <Description
            country={modalCountry}
            data={descData.getData(modalCountry)}
          />
        </Modal>
        <Chart
          total={data.COUNT_TOTAL}
          current={this.getFilteredCount()}
        />
        <Table
          data={data.FEATURES}
          columns={data.COLUMNS}
          filterTest={this.isFiltered}
          onFilterClick={this.toggleFilter}
          onInfoClick={this.setModalDisplay}
        />
      </div>
    )
  },
})

export default Container
