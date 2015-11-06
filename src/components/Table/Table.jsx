import React from 'react'
import mapObj from '../../mapObj'
import {head} from 'ramda'

function cntr (data, country) {
  return (
    <tr key={country}>
      <th>{country}</th>
      {mapObj((value, i) => (
        <td key={i}>{value}</td>
      ), data)}
    </tr>
  )
}

function filterClassName (filtered) {
  return filtered ? 'is-filtered' : ''
}

function ColumnHead (props) {
  const {onClick, filtered} = props
  return (
    <th onClick={onClick} className={`Table-columnHead ${filterClassName(filtered)}`}>
      {props.children}
    </th>
  )
}

function CountryRow (props) {
  const {data, country, onClick, filtered} = props
  return (
    <tr className={`Table-countryRow ${filterClassName(filtered)}`}>
      <th onClick={onClick}>{country}</th>
      {mapObj((value, i) => (
        <td key={i}>{value}</td>
      ), data)}
    </tr>
  )
}

function bindFilter (onFilterClick) {
  return function (filterName) {
    return onFilterClick.bind(null, filterName)
  }
}

function Table (props) {
  const {data, columns, filterTest, onFilterClick} = props

  const filterFun = bindFilter(onFilterClick)

  return (
    <table>
      <thead>
        <tr>
          <th>Country</th>
          {columns.map((col) => {
            return (
              <ColumnHead
                onClick={filterFun(col)}
                key={col}
                filtered={filterTest(col)}
              >
                {col}
              </ColumnHead>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {mapObj((data, name) => {
          return (
            <CountryRow
              data={data}
              onClick={filterFun(name)}
              filtered={filterTest(name)}
              country={name}
            />
          )
        }, data)}
      </tbody>
    </table>
  )
}

export default Table
