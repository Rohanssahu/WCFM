import pickBy from 'lodash/pickBy'
import isPlainObject from 'lodash/isPlainObject'

export function queryParams (queryString = '') {
  /**
   * Convert query params to JS object
   *
   * @param queryString {string} The location search string
   */
  if (queryString[0] === '?') {
    queryString = queryString.slice(1)  //eslint-disable-line
  }
  return queryString.split('&')
    .filter((x) => x.trim())
    .map((x) => x.split('='))
    .reduce((acc, [key, val]) => {
      acc[decodeURIComponent(key)] = decodeURIComponent(val)
      return acc
    }, {})
}

/**
 * Replace one or multiple params in the given search string
 *
 * @param search {string} Location search string
 * @param key {string|object} name of key to replace or object in the form { key: newValue}
 * @param value {string} new value to set of key is string
 *
 * @returns {object} Object with new params provided
 */
export function replaceQueryParam (search, key, value) {
  const params = queryParams(search)
  return isPlainObject(key)
    ? { ...params, ...key }
    : { ...params, [key]: value }
}

/**
 * Converts JS object to search string
 *
 * @param params JS object
 * @param prefix Prefix for search string (usually ?)
 *
 * @returns {string}
 */
export function toSearchString (params, prefix = '?') {
  return `${prefix}${Object.entries(params)
    .map((param) => param.join('='))
    .join('&')}`
}

export function toUrlParams (url, params, delimiter = '/') {
  if (!url || !params) { return '' }
  let splitUrl = url.split(delimiter)
  Object.keys(params).forEach((param) => {
    splitUrl = splitUrl.map(
      (urlParam) => urlParam.replace(new RegExp(`:${param}`, 'g'),
        params[param]))
  })
  return `${splitUrl.join(delimiter)}`
}

/**
 * Remove null values from object
 * @param obj
 */
export const filterNullQueryParams = (obj) => pickBy(obj,
  (value) => value !== null)
