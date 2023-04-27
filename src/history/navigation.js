import history from './index';
import routes from './routes';

export function slashStrip(text) {
  let newText = text;
  if (newText[0] === '/') {
    newText = newText.substring(1);
  }
  if (newText[newText.length] === '/') {
    newText = newText.substring(0, newText.length - 2);
  }
  return newText;
}

function buildPath(path, params, query) {
  let newPath = path;
  if (params) {
    for (const k in params) {
      newPath = newPath.replace(`:${k}`, encodeURIComponent(params[k]));
    }
  }
  let queryString = '';
  if (query) {
    const queryParts = [];
    for (const q in query) {
      queryParts.push(`${q}=${encodeURIComponent(query[q])}`);
    }
    if (queryParts) {
      queryString = `?${queryParts.join('&')}`;
    }
  }
  return newPath + queryString;
}

export function getPathFor(routeName, payload) {
  if (routeName && routeName in routes) {
    const { route } = routes[routeName];
    if (payload) {
      return route ? buildPath(route, payload.params, payload.query) : null;
    }
    return route;
  }
  return null;
}

export function getPathForExploration(esState, queryParams) {
  if (esState) {
    const navObj = esState.navigationObject(queryParams);
    return getPathFor(navObj.routeName, {
      params: navObj.params,
      query: navObj.query,
    });
  }
  return null;
}

export function navigateToExploration(esState, queryParams) {
  const path = getPathForExploration(esState, queryParams);
  if (path !== undefined && path !== null) {
    history.push(path);
  }
}

/**
 *
 * @param routeName
 * @param params
 * @param query
 */
export function navigate(routeName, payload) {
  const path = getPathFor(routeName, payload);
  if (path !== undefined && path !== null) {
    history.push(path);
  }
}
