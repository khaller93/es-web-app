import { getState } from '../store/localstorage';
import parseState from '../models/state';

/**
 * This reducer handles all the actions for altering the history.
 *
 * @param state on which the given action shall be executed.
 * @param action that shall be executed.
 * @return {*} new state.
 */
const historyReducer = (state = getState(historyReducer.id), action) => {
  switch (action.type) {
    case 'ADD_ES_ENTRY':
      if (action.payload && action.payload.id) {
        return {
          ...state,
          list: [action.payload.id.plainObject].concat((state.list ? state.list : [])
            .filter((oid) => !parseState(oid).match(action.payload.id))),
        };
      }
      return state;
    case 'CLEAR_HISTORY':
      return { ...state, list: [] };
    default:
      return state;
  }
};

historyReducer.id = 'history';

export default historyReducer;
