import { searchStateId } from './explorer/explorerId';
import setSearchStatus from './explorer/setStatus';
import prepareResultList from './explorer/prepareResultList';

/**
 * This reducer handles all actions for the explorer page.
 *
 * @param state on which the given action shall be executed.
 * @param action that shall be executed.
 * @return {*} new state.
 */
const explorerReducer = (state = {}, action) => {
  switch (action.type) {
    case 'EXPLORER_CONFIG_PENDING':
      return {
        ...state,
        config: { ...state.config, status: { value: 'loading', timestamp: Date.now() } },
      };
    case 'EXPLORER_CONFIG_REJECTED':
      return {
        ...state,
        config: { ...state.config, status: { value: 'error', timestamp: Date.now() } },
      };
    case 'EXPLORER_CONFIG_FULFILLED':
      return {
        ...state,
        config: { ...action.payload ? action.payload : {}, status: { value: 'loaded', timestamp: Date.now() } },
      };
      /* SEARCH EXPLORATION */
    case 'SET_EXPLORE_SEARCH_FOR':
      const id = searchStateId(action.payload);
      return {
        ...state,
        state: {
          role: action.payload.role,
          searchText: action.payload.searchText,
          categories: action.payload.categories,
          selectedResource: action.payload.selectedResource,
          facets: action.payload.facets,
          id,
        },
        status: setSearchStatus(state.status, id, 'loading'),
      };
    case 'EXPLORE_SEARCH_REJECTED':
      return {
        ...state,
        status: setSearchStatus(state.status, searchStateId(action.payload.searchState), 'error'),
      };
    case 'EXPLORE_SEARCH_FULFILLED':
      return {
        ...state,
        status: setSearchStatus(state.status, searchStateId(action.payload.searchState), 'loaded'),
      };
    case 'EXPLORE_SEARCH_ADD_RESOURCES':
      return {
        ...state,
        resultDict: prepareResultList(state.resultDict, action.payload.searchState,
          action.payload.resourceList, action.payload.offset, action.payload.metadata),
      };
    default:
      return state;
  }
};

explorerReducer.id = 'explorer';

export default explorerReducer;
