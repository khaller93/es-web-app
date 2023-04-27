import ESM from "../actions/services/esm";

let server = {};
try {
    server = require('./server.json');
} catch (e) {
    throw new Error('Configuration must be compiled for a functioning application.');
}

/**
 * adds the base path to the given path.
 *
 * @param path to which the base path shall be added.
 */
export function resolve(path) {
    if ('basepath' in server && server.basepath) {
        return server.basepath + path;
    }
    return path ? (path.charAt(0) === '/' ? path : '/' + path) : '/';
}

/**
 * gets the server object that will be used for fetching
 * the required data.
 *
 * @return {*} the server object that will be used for fetching
 * the required data.
 */
export function getServer() {
    if ('server' in server && 'ESM' in server['server']) {
        if (server['server']['ESM']) {
            return new ESM(server['server']['ESM'].url);
        }
    }
    throw new Error('A server URL for the ESM service must be specified.');
}

function loadConfig(action, filename) {
    return dispatch => {
        dispatch({
            type: action,
            payload: fetch('/configuration/' + filename).then((res) => res.json()),
        });
    }
}

/**
 * gets the general application config.
 *
 * @return {{}} the general application config in form of
 * a JSON object.
 */
export function getAppConfigAction() {
    return loadConfig('APP_CONFIG', 'general.json');
}

/**
 * gets the configuration for the interactive exploration.
 *
 * @return {{}}  the configuration for the interactive exploration.
 */
export function getExplorerConfig() {
    return loadConfig('EXPLORER_CONFIG', 'explorer.json');
}

/**
 * gets the reactor configuration.
 *
 * @return {{}} the configuration for the  reactor.
 */
export function getReactorConfig() {
    return loadConfig('REACTOR_CONFIG', 'reactor.json');
}

/**
 * gets the configured prefix that shall be managed.
 *
 * @return {{}} the configuration for the managed prefix.
 */
export function getPrefixConfig() {
    return loadConfig('PREFIX_CONFIG', 'prefix.json');
}
