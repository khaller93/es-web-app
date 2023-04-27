import axios from "axios";

const prefixCCURL = 'http://prefix.cc/';

/**
 * gathers the namespace commonly associated with the given prefix name.
 *
 * @param prefixName for which the namespace shall be gathered.
 * @param history that contains information about whether a request
 * has already been tried.
 * @param dispatch for dispatching actions
 */
export function getNamespaceFor(prefixName, history, dispatch) {
    if (prefixName) {
        if (!history.prefix || !(prefixName in history.prefix)) {
            dispatch({
                type: 'ADD_PREFIX_NAMESPACE_PENDING',
                payload: {prefix: prefixName},
            });
            axios.get(prefixCCURL + prefixName + ".file.json").then(response => {
                if (response && response.data) {
                    const prefixKeys = Object.keys(response.data);
                    if (prefixKeys && prefixKeys.length > 0) {
                        dispatch({
                            type: 'ADD_PREFIX_NAMESPACE_FULFILLED',
                            payload: {
                                prefix: prefixName,
                                namespace: response.data[prefixKeys[0]],
                            },
                        });
                        return;
                    }
                }
                dispatch({
                    type: 'ADD_PREFIX_NAMESPACE_REJECTED',
                    payload: {prefix: prefixName},
                });
            }).catch(error => {
                dispatch({
                    type: 'ADD_PREFIX_NAMESPACE_REJECTED',
                    payload: {prefix: prefixName, error: error},
                });
            });
        }
    }
}

/**
 *  gathers the prefix commonly associated with the given namespace.
 *
 * @param namespace for which a commonly associated prefix shall be gathered.
 * @param history that contains information about whether a request
 * has already been tried.
 * @param dispatch for dispatching actions
 */
export function getPrefixForNamespace(namespace, history, dispatch) {
    if (namespace) {
        if (!history.namespace || !(namespace in history.namespace)) {
            dispatch({
                type: 'ADD_NAMESPACE_PREFIX_PENDING',
                payload: {namespace: namespace}
            });
            axios.get(prefixCCURL + "reverse", {
                params: {
                    format: 'json',
                    uri: namespace,
                }
            }).then(response => {
                if (response && response.data) {
                    const prefixKeys = Object.keys(response.data);
                    if (prefixKeys && prefixKeys.length > 0) {
                        dispatch({
                            type: 'ADD_NAMESPACE_PREFIX_FULFILLED',
                            payload: {
                                namespace: namespace,
                                prefix: prefixKeys[0]
                            },
                        });
                        return;
                    }
                }
                dispatch({
                    type: 'ADD_NAMESPACE_PREFIX_REJECTED',
                    payload: {namespace: namespace},
                });
            }).catch(error => {
                dispatch({
                    type: 'ADD_NAMESPACE_PREFIX_REJECTED',
                    payload: {namespace: namespace, error: error}
                });
            });
        }
    }
}