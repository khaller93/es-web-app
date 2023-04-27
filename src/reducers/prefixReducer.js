/* reverse the prefix map for the reverse lookup */
function reverse(map) {
  if (map) {
    const rev = {};
    Object.keys(map).forEach((p) => {
      rev[map[p]] = p;
    });
    return rev;
  }
  return {};
}

/* helper functions for creating status object */
const statusObj = (status) => ({ status, timestamp: Date.now() });

/* helper function for pushing history entry */
const getHistoryStatus = (history, variable, argument, status) => {
  const variableHistory = { ...history[variable] };
  variableHistory[argument] = statusObj(status);
  const newHistory = { ...history };
  newHistory[variable] = variableHistory;
  return newHistory;
};

/**
 * reducer for maintaining prefix names and namespaces.
 *
 * @param state current prefix/namespace state
 * @param action that shall be executed.
 * @return {*} new prefix/namespace state.
 */
const prefixReducer = (state = {
  map: {},
  reverse: {},
  history: {
    prefix: {},
    namespace: {},
  },
}, action) => {
  switch (action.type) {
    case 'PREFIX_CONFIG_PENDING':
      return {
        ...state,
        status: {
          value: 'loading',
          timestamp: Date.now(),
        },
      };
    case 'PREFIX_CONFIG_REJECTED':
      return {
        ...state,
        status: {
          value: 'error',
          timestamp: Date.now(),
        },
      };
    case 'PREFIX_CONFIG_FULFILLED':
      return {
        ...action.payload ? {
          ...state,
          map: action.payload,
          reverse: reverse(action.payload),
        } : {},
        status: {
          value: 'loaded',
          timestamp: Date.now(),
        },
      };
    case 'ADD_PREFIX_NAMESPACE_PENDING':
      if (action.payload.prefix) {
        return {
          ...state,
          history: getHistoryStatus(state.history, 'prefix', action.payload.prefix, 'loading'),
        };
      }
      return state;
    case 'ADD_PREFIX_NAMESPACE_REJECTED':
      if (action.payload.prefix) {
        return {
          ...state,
          history: getHistoryStatus(state.history, 'prefix', action.payload.prefix, 'failed'),
        };
      }
      return state;
    case 'ADD_PREFIX_NAMESPACE_FULFILLED':
      if (action.payload.prefix && action.payload.namespace) {
        if (!(action.payload.prefix in state.map)) {
          const map = { ...state.map };
          map[action.payload.prefix] = action.payload.namespace;
          const reverse = { ...state.reverse };
          reverse[action.payload.namespace] = action.payload.prefix;
          return {
            map,
            reverse,
            history: getHistoryStatus(state.history, 'prefix', action.payload.prefix, 'fulfilled'),
          };
        }
      }
      return state;

    case 'ADD_NAMESPACE_PREFIX_PENDING':
      if (action.payload.namespace) {
        return {
          ...state,
          history: getHistoryStatus(state.history,
            'namespace',
            action.payload.namespace,
            'loading'),
        };
      }
      return state;
    case 'ADD_NAMESPACE_PREFIX_REJECTED':
      if (action.payload.namespace) {
        return {
          ...state,
          history: getHistoryStatus(state.history, 'namespace', action.payload.namespace, 'failed'),
        };
      }
      return state;
    case 'ADD_NAMESPACE_PREFIX_FULFILLED':
      if (action.payload.namespace) {
        if (!(action.payload.prefix in state.map)) {
          const map = { ...state.map };
          map[action.payload.prefix] = action.payload.namespace;
          const reverse = { ...state.reverse };
          reverse[action.payload.namespace] = action.payload.prefix;
          return {
            map,
            reverse,
            history: getHistoryStatus(state.history,
              'namespace',
              action.payload.namespace,
              'fulfilled'),
          };
        }
      }
      return state;

    default:
      return state;
  }
};

prefixReducer.id = 'prefix';

export default prefixReducer;
