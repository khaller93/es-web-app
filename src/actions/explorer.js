import {
    startESMSearchExploration,
    startESMSPARQLExploration,
    startESMTreeViewExploration
} from "./services/esm/explorer";

/**
 *
 *
 * @param state an ESState which shall be executed.
 * @param config configuration object for the execution.
 */
export function startExploration(state, config) {
    if (state) {
        return (dispatch) => {
            dispatch({type: 'ADD_ES_ENTRY', payload: {id: state}});
            switch (state.method) {
                case 'search':
                    return dispatch(startSearchExploration(state.plainObject, config));
                case 'sparql':
                    return dispatch(startSPARQLExploration(state.plainObject, config));
                case 'treeview':
                    return dispatch(startTreeViewExploration(state.plainObject, config));
                default:
                    console.log('Method unknown.', state.method);
            }
        };
    }
}

export default function getClassesFor(categories, role, catConf) {
    if (categories && categories.length > 0) {
        if (catConf) {
            let classes = new Set([]);
            for (let i = 0; i < categories.length; i++) {
                if (categories[i] in catConf && catConf[categories[i]].classes) {
                    classes.add(...catConf[categories[i]].classes);
                }
            }
            return [...classes];
        }
        return [];
    }
    return null;
}

/**
 *
 *
 * @return {{payload: {searchText: *, categories: *}, type: string}} action payload
 * for starting a new search.
 */
export function startSearchExploration({role, searchText, categories, selectedResource, facets}, config) {
    /* assemble payload for redux */
    return (dispatch) => {
        dispatch({
            type: 'SET_EXPLORE_SEARCH_FOR',
            payload: {
                role: role,
                searchText: searchText,
                categories: categories,
                selectedResource: selectedResource,
                facets: facets,
            }
        });
        startESMSearchExploration(dispatch, {role, searchText, categories, selectedResource, facets}, {
            searchConf: config.search,
            appConf: config.app,
            catConf: config.categories,
        });
    };
}

/**
 *
 *
 * @param role
 * @param text
 * @param config
 * @return {Function}
 */
export function startSPARQLExploration({role, text}, config) {
    return startESMSPARQLExploration({role, text}, config);
}

export function startTreeViewExploration({role, view, selectedIRI}, config) {
    return startESMTreeViewExploration({role, view, selectedIRI}, config);
}