import React from 'react'
import {FontIcon, Checkbox, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn} from 'material-ui'
import Colors from 'material-ui/lib/styles/colors'
import mapObj from '../../mapObj'
import {colLabel} from '../../labels'

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

function CellIcon (props) {
  const {filtered, value} = props
  const color = !filtered ? Colors.red500 : Colors.grey500
  if (value) {
    return (
      <div className="Table-featureIcon">
      <FontIcon
        className="fa fa-exclamation-circle"
        color={color}
      />
      </div>
      )
  } else {
    return <div className="Table-featureIcon" />
  }
}

function CountryRow (props) {
  const {filterTest, data, country, onClick} = props
  const rowFiltered = filterTest(country)
  return (
    <TableRow className={`Table-countryRow ${filterClassName(rowFiltered)}`}>
      <TableHeaderColumn>
        <FilterCheckbox
          label={country}
          onClick={onClick}
          filtered={rowFiltered}
        />
      </TableHeaderColumn>
      {mapObj((value, col) => (
        <TableRowColumn key={col} className="Table-featureCell">
        <CellIcon
          value={value}
          filtered={rowFiltered || filterTest(col)}
        />
        </TableRowColumn>
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
    <Table className="Table" fixedHeader height="20em">
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
                  label={colLabel(col)}
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
              filterTest={filterTest}
              country={name}
            />
          )
        }, data)}
      </TableBody>
    </Table>
  )
}

export default TableWrapper
