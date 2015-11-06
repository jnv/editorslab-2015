import React from 'react'
import mapObj from '../../mapObj'
import {Checkbox, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn} from 'material-ui'

function filterClassName (filtered) {
  return filtered ? 'is-filtered' : ''
}

function ColumnHead (props) {
  const {filtered} = props
  return (
    <TableHeaderColumn className={`Table-columnHead ${filterClassName(filtered)}`}>
      {props.children}
    </TableHeaderColumn>
  )
}

function FilterCheckbox (props) {
  const {onClick, filtered, label} = props
  return (
    <Checkbox
      defaultChecked={!filtered}
      onCheck={onClick}
      label={label}
    />
  )
}

function CountryRow (props) {
  const {data, country, onClick, filtered} = props
  return (
    <TableRow className={`Table-countryRow ${filterClassName(filtered)}`}>
      <TableHeaderColumn>
        <FilterCheckbox
          label={country}
          onClick={onClick}
          filtered={filtered}
        />
      </TableHeaderColumn>
      {mapObj((value, i) => (
        <TableRowColumn key={i}>{value}</TableRowColumn>
      ), data)}
    </TableRow>
  )
}

function bindFilter (onFilterClick) {
  return function (filterName) {
    return onFilterClick.bind(null, filterName)
  }
}

function TableWrapper (props) {
  const {data, columns, filterTest, onFilterClick} = props

  const filterFun = bindFilter(onFilterClick)

  return (
    <Table>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Country</TableHeaderColumn>
          {columns.map((col) => {
            return (
              <ColumnHead
                key={col}
                filtered={filterTest(col)}
              >
                <FilterCheckbox
                  label={col}
                  filtered={filterTest(col)}
                  onClick={filterFun(col)}
                />
              </ColumnHead>
            )
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
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
      </TableBody>
    </Table>
  )
}

export default TableWrapper
