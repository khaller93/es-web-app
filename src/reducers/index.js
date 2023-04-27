import { combineReducers } from 'redux';
import appReducer from './appReducer';
import explorerReducer from './explorerReducer';
import resourcesReducer from './resourcesReducer';
import historyReducer from './historyReducer';
import searchBarReducer from './searchBarReducer';
import sparqlExplorerReducer from './sparqlExplorerReducer';
import prefixReducer from './prefixReducer';
import reactorReducer from './reactorReducer';
import treeViewReducer from './treeViewReducer';
import facetReducer from './facetReducer';

const reducerMap = {};

reducerMap[appReducer.id] = appReducer;
reducerMap[explorerReducer.id] = explorerReducer;
reducerMap[facetReducer.id] = facetReducer;
reducerMap[treeViewReducer.id] = treeViewReducer;
reducerMap[reactorReducer.id] = reactorReducer;
reducerMap[resourcesReducer.id] = resourcesReducer;
reducerMap[historyReducer.id] = historyReducer;
reducerMap[searchBarReducer.id] = searchBarReducer;
reducerMap[sparqlExplorerReducer.id] = sparqlExplorerReducer;
reducerMap[prefixReducer.id] = prefixReducer;

export default combineReducers(reducerMap);
