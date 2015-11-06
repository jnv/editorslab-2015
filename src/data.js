import R from 'ramda'

// Plain CSV-like list of objects
const RAW_DATA = require('../data.json')

const OMITTED_COLS = ['people', 'country']

//  indexBy :: String -> [Object] -> Object
const indexBy = R.curry((prop, list) => {
  return R.map(R.head, R.groupBy(R.prop(prop), list))
})

// index list by countries
export const DATA = indexBy('country', RAW_DATA)

const getCount = R.map(R.prop('people'))
const getFeatures = R.map(R.omit(OMITTED_COLS))
const getCols = R.pipe(R.head, R.omit(OMITTED_COLS), R.keys)

const toBool = val => !!val

export const COUNT = getCount(DATA)
export const FEATURES = getFeatures(DATA)
export const COLUMNS = getCols(RAW_DATA)
export const COUNTRIES = R.keys(DATA)

const sumCount = R.pipe(R.values, R.sum)

export const COUNT_TOTAL = sumCount(COUNT)

const filterPredicate = (filters) => {
  return (value, key) => !filters[key]
}

const truthyProps = R.pickBy((val) => val)

// const filteredFeatures = filters => R.intersection(COLUMNS, R.keys(truthyProps(filters)))
const keptFeatures = filters => R.difference(COLUMNS, R.keys(truthyProps(filters)))

const rowMatches = (filters, row) => {
  const columns = keptFeatures(filters)
  const values = R.values(R.pick(columns, row))
  return !R.all(R.equals(0))(values)
}

export const countUnfiltered = (filters) => {
  // first get rid of countries which are filtered
  const activeCountries = R.pickBy(filterPredicate(filters), FEATURES)

  const filteredCountries = []
  R.mapObjIndexed((row, country) => {
    // console.log(row, country, rowMatches(row))
    if (rowMatches(filters, row)) {
      filteredCountries.push(country)
    }
  }, activeCountries)

  const counts = R.pick(filteredCountries, COUNT)

  return sumCount(counts)
}
