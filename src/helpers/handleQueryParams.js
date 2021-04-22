import qs from 'qs';

/**
 * Function: Handle query param
 * @param {string} query
 * @param {Oject} defaultQuery
 */
const handleQueryParams = (query: string, defaultQuery: Object) =>
  Object.keys(qs.parse(query, { ignoreQueryPrefix: true })).length > 0
    ? qs.parse(query, { ignoreQueryPrefix: true })
    : defaultQuery;

export default handleQueryParams;
