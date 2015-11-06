import React from 'react'
import {IconButton, FontIcon, Checkbox, Table, TableHeader,
  TableRow, TableHeaderColumn, TableBody, TableRowColumn} from 'material-ui'
import Colors from 'material-ui/lib/styles/colors'
import mapObj from '../../mapObj'
import {colLabel} from '../../labels'
import {hasDescription} from '../../descriptions.js'

const infoCellStyle = {
  width: '48px',
  paddingLeft: '0',
  paddingRight: '0',
}

function filterClassName (filtered) {
  return filtered ? 'is-filtered' : ''
}

function DescriptionButton (props) {
  const {onClick, country} = props
  if (hasDescription(country)) {
    return (
      <IconButton onClick={onClick}>
        <FontIcon
          className="fa fa-info"
          color={Colors.cyan500}
        />
      </IconButton>
    )
  } else {
    return <span />
  }
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
  const {filterTest, data, country, onClick, onInfoClick} = props
  const rowFiltered = filterTest(country)
  const infoClickHandler = () => onInfoClick(country)
  return (
    <TableRow className={`Table-countryRow ${filterClassName(rowFiltered)}`}>
      <TableRowColumn style={infoCellStyle} className="Table-infoCell">
      <DescriptionButton onClick={infoClickHandler} country={country} />
      </TableRowColumn>
      <TableHeaderColumn className="Table-countryName">
        <FilterCheckbox
          label={country}
          onClick={onClick}
          filtered={rowFiltered}
        />
      </TableHeaderColumn>
      {mapObj((value, col) => (
        <TableRowColumn key={col} className={`Table-featureCell ${filterClassName(rowFiltered || filterTest(col))}`}>
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
  const {data, columns, filterTest, onFilterClick, onInfoClick} = props

  const filterFun = bindFilter(onFilterClick)

  return (
    <div className="Table">
    <Table fixedHeader height="70vh">
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn style={infoCellStyle} className="Table-infoHeader" />
          <TableHeaderColumn className="Table-countryHeader">Country</TableHeaderColumn>
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
              onInfoClick={onInfoClick}
            />
          )
        }, data)}
      </TableBody>
    </Table>
    </div>
  )
}

export default TableWrapper
