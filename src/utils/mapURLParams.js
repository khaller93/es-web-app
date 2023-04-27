import * as queryString from 'query-string';

/* extracts the query parameters from the url */
export default function mapURLParams(location) {
  if (location && location.search) {
    const params = { ...queryString.parse(location.search) };
    if (params) {
      return params;
    }
  }
  return {};
}
