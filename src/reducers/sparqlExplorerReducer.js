import setSearchStatus from './explorer/setStatus';
import { sparqlStateId } from './explorer/explorerId';
import prepareSPARQLResult from './explorer/prepareSPARQLResult';

const prefixProlog = (pConfig) => {
  let prolog = '';
  for (const p in pConfig) {
    prolog += `PREFIX ${p}: <${pConfig[p]}>\n`;
  }
  return prolog + (prolog ? '\n' : '');
};

const defaultQuery = (pConfig) => `${prefixProlog(pConfig)}SELECT * WHERE {\n  ?s ?p ?o .\n} LIMIT 10`;

/**
 * This reducer handles the SPARQL explorer.
 *
 * @param state on which the given action shall be executed.
 * @param action that shall be executed.
 * @return {*} new state.
 */
const sparqlExplorerReducer = (state = {
  editor: {
    text: defaultQuery({}),
    type: 'SELECT',
  },
},
action) => {
  switch (action.type) {
    case 'PREFIX_CONFIG_FULFILLED':
      return {
        ...state,
        editor: {
          text: defaultQuery(action.payload ? action.payload : {}),
          type: 'SELECT',
        },
      };
    case 'UPDATE_SPARQL_EDITOR':
      return { ...state, editor: action.payload };
    case 'SPARQL_QUERY_PENDING':
      return {
        ...state,
        state: action.payload.id ? {
          text: action.payload.id.text,
          type: action.payload.id.type,
          id: sparqlStateId(action.payload.id),
        } : null,
        status: setSearchStatus(state.status, sparqlStateId(action.payload.id), 'loading'),
      };
    case 'SPARQL_QUERY_REJECTED':
      return {
        ...state,
        status: setSearchStatus(state.status, sparqlStateId(action.payload.id), 'error'),
      };
    case 'SPARQL_QUERY_FULFILLED':
      return {
        ...state,
        data: prepareSPARQLResult(state.data, action.payload.id, action.payload.result),
        status: setSearchStatus(state.status, sparqlStateId(action.payload.id), 'fulfilled'),
      };
    default:
      return state;
  }
};
sparqlExplorerReducer.id = 'sparqlExplorer';

export default sparqlExplorerReducer;
