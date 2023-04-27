import axios from 'axios';
import { getServer } from '../../../configuration';
import { prepareExplorationFlow, prepareTreeViewFlow } from '../assembler/exploration';
import { getClassInformation, getResourceDescription } from './utils';
import getClassesFor from '../../explorer';

const server = getServer();

export function startESMSearchExploration(dispatch, {
  role, searchText, categories, selectedResource, facets,
}, { searchConf, appConf, catConf }) {
  const actionResponse = dispatch({
    type: 'EXPLORE_SEARCH',
    payload: new Promise((resolve, reject) => axios.post(server.explorationFlowEndPoint, {
      steps: prepareExplorationFlow({
        searchText,
        classes: getClassesFor(categories, role, catConf),
        selectedResource,
        facets,
        limit: 60,
      }, searchConf, appConf),
    }).then((response) => {
      resolve({
        searchState: {
          role, searchText, categories, selectedResource, facets,
        },
        response,
      });
    }).catch((error) => {
      reject({
        searchState: {
          searchText, categories, selectedResource, facets,
        },
        error,
      });
    })),
  });
  actionResponse.then(({ value: { searchState, response } }) => {
    dispatch({
      type: 'EXPLORE_SEARCH_ADD_RESOURCES',
      payload: {
        searchState,
        resourceList: response && response.data ? response.data.list : null,
        metadata: response && response.data ? response.data.metadata : null,
        offset: 0,
      },
    });
    dispatch({
      type: 'DESCRIBE_RESOURCES',
      payload: {
        list: getResourceDescription(response && response.data ? response.data.list : null,
          response && response.data ? response.data.values : null),
        role,
      },
    });
    dispatch({
      type: 'ADD_CLASS_INFO',
      payload: {
        list: getClassInformation(response && response.data ? response.data.list : null,
          response && response.data ? response.data.values : null),
        role,
      },
    });
  });
}

export function startESMSPARQLExploration({ role, text, type }, config) {
  return (dispatch) => {
    dispatch({
      type: 'SPARQL_QUERY_PENDING',
      payload: {
        id: { role, text, type },
      },
    });
    axios.get(server.sparqlQueryEndpoint, {
      params: {
        query: text,
      },
      responseType: 'json',
    }).then((response) => {
      dispatch({
        type: 'SPARQL_QUERY_FULFILLED',
        payload: {
          id: { role, text, type },
          result: response.data,
        },
      });
    }).catch((error) => {
      dispatch({
        type: 'SPARQL_QUERY_REJECTED',
        payload: {
          id: { role, text, type },
          error,
        },
      });
    });
  };
}

export function startESMTreeViewExploration({ role, view, selectedIRI }, config) {
  return (dispatch) => {
    dispatch({
      type: 'TREEVIEW_PENDING',
      payload: {
        id: { role, view, selectedIRI },
      },
    });
    axios.post(server.explorationFlowEndPoint, {
      steps: prepareTreeViewFlow(config),
    }).then((response) => {
      if (response.data && response.data.all && response.data.all.length > 0) {
        const resourceList = [...response.data.all.map((rn) => rn.resource)];
        dispatch({
          type: 'ADD_CLASS_INFO',
          payload: {
            list: getClassInformation(resourceList, response.data.values),
            role,
          },
        });
        dispatch({
          type: 'DESCRIBE_RESOURCES',
          payload: {
            list: getResourceDescription(resourceList, response.data.values),
            role,
          },
        });
      }

      dispatch({
        type: 'TREEVIEW_FULFILLED',
        payload: {
          id: { role, view, selectedIRI },
          result: response.data,
        },
      });
    }).catch((error) => {
      dispatch({
        type: 'TREEVIEW_REJECTED',
        payload: {
          id: { role, view, selectedIRI },
          error,
        },
      });
    });
  };
}
