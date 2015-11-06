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

export const COUNT = getCount(DATA)
export const FEATURES = getFeatures(DATA)
export const COLUMNS = getCols(RAW_DATA)
export const COUNTRIES = R.keys(DATA)

const sumCount = R.pipe(R.values, R.sum)

export const COUNT_TOTAL = sumCount(COUNT)

const filterPredicate = (filters) => {
  return (value, key) => !filters[key]
}

export const countUnfiltered = (filters) => {
  // first get rid of countries which are filtered
  const activeCount = R.pickBy(filterPredicate(filters), COUNT)
  console.log(activeCount)
  return sumCount(activeCount)
}
