import R from 'ramda'

const DATA = require('../descriptions.json')

const findCountry = country => R.find(R.propEq('country', country))(DATA)

export function getData (country) {
  if (!country) {
    return null
  }

  return findCountry(country)
}

export const hasDescription = (country) => !!getData(country)
