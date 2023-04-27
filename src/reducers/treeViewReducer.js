import { treeViewStateId } from './explorer/explorerId';
import setSearchStatus from './explorer/setStatus';
import prepareTreeViewResult from './explorer/prepareTreeViewResult';

/**
 * This reducer handles the tree view explorer.
 *
 * @param state on which the given action shall be executed.
 * @param action that shall be executed.
 * @return {*} new state.
 */
const treeViewReducer = (state = {
  state: {},
  config: {},
}, action) => {
  switch (action.type) {
    case 'TREEVIEW_PENDING':
      return {
        ...state,
        state: action.payload.id ? {
          role: action.payload.id.role,
          selectedIRI: action.payload.id.selectedIRI,
          view: action.payload.id.view,
          id: treeViewStateId(action.payload.id),
        } : null,
        status: setSearchStatus(state.status, treeViewStateId(action.payload.id), 'loading'),
      };
    case 'TREEVIEW_REJECTED':
      return {
        ...state,
        status: setSearchStatus(state.status, treeViewStateId(action.payload.id), 'error'),
      };
    case 'TREEVIEW_FULFILLED':
      return {
        ...state,
        data: prepareTreeViewResult(state.data, action.payload.id, action.payload.result),
        status: setSearchStatus(state.status, treeViewStateId(action.payload.id), 'fulfilled'),
      };
    case 'SELECT_TREE_VIEW_RESOURCE':
      return {
        ...state,
        state: { ...state.state, selectedIRI: action.payload },
      };
    default:
      return state;
  }
};

treeViewReducer.id = 'treeview';

export default treeViewReducer;
